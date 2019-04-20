const svgr = require('@svgr/core').default;
const { insertRef } = require('@svgr/core');
const fs = require('fs');
const { join, resolve } = require('path');
const { promisify } = require('util');
const { pascal } = require('change-case');

const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const iconDir = resolve(join(__dirname, '../icons'));

const outDir = resolve(join(__dirname, '../generated'));

const readIcon = async (fileName) => {
    const content = await readFile(join(iconDir, fileName));
    return { name: fileName, content };
};

const transformName = name => pascal(name.replace('.svg', ''));

const transformIcon = ({name, content}) => svgr(content, svgrOptions, { componentName: transformName(name) })

const writeIcon = (name, fileContent) => writeFile(join(outDir, name), fileContent, { encoding: 'utf-8' });

const template = (
    { template },
    opts,
    { componentName, jsx, props }
  ) => {
    const typeScriptTpl = template.smart({ plugins: ['typescript', '@svgr/plugin-jsx'] })
    return typeScriptTpl.ast`
    import * as React from 'react';
    export const ${componentName} = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props: React.SVGProps<SVGSVGElement>, svgRef: React.Ref<SVGSVGElement>) => (${jsx}));
  `
}

const svgrOptions = {
    icon: true,
    ref: true,
    svgProps: {
        stroke: 'currentColor'
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
    const icons = await readDir(iconDir);
    const index = await Promise.all(icons.map(createIcon));
    await writeFile(join(outDir, 'index.ts'), index.join('\n'), { encoding: 'utf-8' });
}

main();