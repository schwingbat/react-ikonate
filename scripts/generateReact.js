const {
	generate
} = require('./generate')

const template = ({
		template,
		types
	},
	opts, {
		componentName,
		jsx,
		props
	}
) => {
	const typeScriptTpl = template.smart({
		plugins: ['typescript', '@svgr/plugin-jsx']
	})

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
	return typeScriptTpl.ast `
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

generate('react-ikonate', template);