const svgr = require('@svgr/core').default;
const fs = require('fs');
const { join, resolve } = require('path');
const { promisify } = require('util');
const { pascal } = require('change-case');
const mkdirp = require('mkdirp');

const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(mkdirp);

const iconDir = resolve(join(__dirname, '../icons'));

const outDir = resolve(join(__dirname, '../src/generated'));

const readIcon = async (fileName) => {
    const content = await readFile(join(iconDir, fileName));
    return { name: fileName, content };
};

const transformName = name => pascal(name.replace('.svg', ''));

const transformIcon = ({name, content}) => svgr(content, svgrOptions, { componentName: transformName(name) })

const writeIcon = (name, fileContent) => writeFile(join(outDir, name), fileContent, { encoding: 'utf-8' });

const template = (
    { template, types },
    opts,
    { componentName, jsx, props }
  ) => {
    const typeScriptTpl = template.smart({ plugins: ['typescript', '@svgr/plugin-jsx'] })
    
    // We add these here, instead of svgrOptions.svgProps, because those are added after this function evaluates
    // which means our spread property below will be overriden
    const lineJoin = types.jsxAttribute(types.jsxIdentifier('strokeLinejoin'), types.stringLiteral('miter'));
    const lineCap = types.jsxAttribute(types.jsxIdentifier('strokeLinecap'), types.stringLiteral('square'));
    const width = types.jsxAttribute(types.jsxIdentifier('strokeWidth'), types.stringLiteral('2'));
    jsx.openingElement.attributes.push(lineJoin);
    jsx.openingElement.attributes.push(lineCap);
    jsx.openingElement.attributes.push(width);

    const spreadExtraProps = types.jsxSpreadAttribute(types.identifier('extraProps'));

    jsx.openingElement.attributes.push(spreadExtraProps);
    return typeScriptTpl.ast`
    import * as React from 'react';
    import { transformContext, IkonateContext } from '../context';
    export const ${componentName} = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props: React.SVGProps<SVGSVGElement>, svgRef: React.Ref<SVGSVGElement>) => {
        const value = React.useContext(IkonateContext);
        const extraProps = transformContext(value);
        return (
            ${jsx}
        );
    });
  `
}

const svgrOptions = {
    icon: true,
    ref: true,
    svgProps: {
        stroke: 'currentColor',
        fill: 'none'
    },
    template
};

const createIcon = async (fileName) => {
    const file = await readIcon(fileName);
    const fileContent = await transformIcon(file);
    const componentName = transformName(file.name);
    await writeIcon(componentName + '.tsx', fileContent);
    return `export * from './${componentName}';`;
}

async function main() {
    await mkdir(outDir);
    const icons = await readDir(iconDir);
    const index = await Promise.all(icons.map(createIcon));
    await writeFile(join(outDir, 'index.ts'), index.join('\n'), { encoding: 'utf-8' });
}

main();