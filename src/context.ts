import { createContext, SVGProps } from 'react';

export type IkonateContextType = {
    border?: number;
    size?: number | string;
    style?: 'square' | 'roundSquare' | 'round';
    color?: string;
}

export const defaultContextValue: IkonateContextType = {
    border: 2,
    style: 'square'
}

export const IkonateContext = createContext<IkonateContextType>({});

type IconStyle = {
    strokeLinecap: 'square' | 'round';
    strokeLinejoin: 'miter' | 'round';
}

type StyleMap = {
    square: IconStyle;
    roundSquare: IconStyle;
    round: IconStyle
}

const styleMap: StyleMap = {
    square: { strokeLinecap: 'square', strokeLinejoin: 'miter' },
    roundSquare: { strokeLinecap: 'square', strokeLinejoin: 'round' },
    round: { strokeLinecap: 'round', strokeLinejoin: 'round' }
}

type ContextTransformer = (context: IkonateContextType) => SVGProps<SVGSVGElement>;

export const transformContext: ContextTransformer = ({ style, size, border, color } = defaultContextValue) => {
    const iconStyle = styleMap[style!];
    return {
        ...iconStyle,
        strokeWidth: border,
        stroke: color,
        fontSize: size
    }
}
