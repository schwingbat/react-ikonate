import * as React from 'react';

export type IkonateContextType = {
	border?: number;
	size?: number | string;
	style?: 'square' | 'roundSquare' | 'round';
	color?: string;
};

export const IkonateContext = React.createContext<IkonateContextType>({});

type IconStyle = {
	strokeLinecap: 'square' | 'round';
	strokeLinejoin: 'miter' | 'round';
};

type StyleMap = {
	square: IconStyle;
	roundSquare: IconStyle;
	round: IconStyle;
};

const styleMap: StyleMap = {
	square: { strokeLinecap: 'square', strokeLinejoin: 'miter' },
	roundSquare: { strokeLinecap: 'round', strokeLinejoin: 'miter' },
	round: { strokeLinecap: 'round', strokeLinejoin: 'round' },
};

type ContextTransformer = (
	context: IkonateContextType,
) => React.SVGProps<SVGSVGElement>;

export const transformContext: ContextTransformer = ({
	style = 'square',
	size,
	border = 2,
	color,
}) => {
	const iconStyle = styleMap[style!];
	return {
		...iconStyle,
		strokeWidth: border,
		color,
		fontSize: size,
	};
};
