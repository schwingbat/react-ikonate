const svgr = require('@svgr/core').default;
const fs = require('fs');
const {
	join,
	resolve
} = require('path');
const {
	promisify
} = require('util');
const {
	pascal
} = require('change-case');
const mkdirp = require('mkdirp');

const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(mkdirp);

const iconDir = resolve(join(__dirname, '../icons'));

const packagesDir = 'packages';

const transformName = name => pascal(name.replace('.svg', ''));

const readIcon = async (fileName) => {
	const content = await readFile(join(iconDir, fileName));
	return {
		name: fileName,
		content
	};
};

exports.generate = async (baseDir, template, options) => {
	const svgrOptions = {
		icon: true,
		ref: true,
		svgProps: {
			stroke: 'currentColor',
			fill: 'none'
		},
        template,
        ...options
    };
    
    const srcDir = resolve(join(__dirname, '..', packagesDir, baseDir, 'src'));

	const transformIcon = ({
		name,
		content
	}) => svgr(content, svgrOptions, {
		componentName: transformName(name)
    })
    
    const createIcon = async (fileName) => {
    	const file = await readIcon(fileName);
    	const fileContent = await transformIcon(file);
    	const componentName = transformName(file.name);
    	await writeIcon(componentName + '.tsx', fileContent);
    	return `export { ${componentName} } from './icons/${componentName}';`;
    }

    const outDir = resolve(join(__dirname, '..', packagesDir, baseDir, 'src/icons'));
    await mkdir(outDir);

    const writeIcon = (name, fileContent) => writeFile(join(outDir, name), fileContent, {
    	encoding: 'utf-8'
    });

	const icons = await readDir(iconDir);
	const index = await Promise.all(icons.map(createIcon));

	

	index.push(`export { IkonateContext } from './context';`)
	await writeFile(join(srcDir, 'index.ts'), index.join('\n'), {
		encoding: 'utf-8'
	});
}