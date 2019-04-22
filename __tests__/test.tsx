import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as ikonateReact from '../src';
import { SVGAttributes } from 'react';
import { IkonateContextType } from '../src/context';

const { IkonateContext, ...icons } = ikonateReact;

const testIcon = ([name, Icon]: [string, React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>]) => {
    it(`${name} renders without props`, () => {
        const wrapper = shallow(<Icon/>);
        expect(wrapper.find('svg').props()).toMatchObject({
            role: 'img',
            width: '1em',
            height: '1em',
            strokeLinecap: 'square',
            strokeLinejoin: 'miter',
            strokeWidth: 2,
            stroke: 'currentColor'
        });
    });

    it(`${name} renders without props [snapshot]`, () => {
        const wrapper = shallow(<Icon/>);
        expect(wrapper).toMatchSnapshot();
    });

    it(`${name} renders with props`, () => {
        const props: SVGAttributes<SVGSVGElement> = {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 1
        };
        const wrapper = shallow(<Icon {...props}/>);
        expect(wrapper.find('svg').props()).toMatchObject(props);
    });

    it(`${name} renders with props [snapshot]`, () => {
        const props: SVGAttributes<SVGSVGElement> = {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 1
        };
        const wrapper = shallow(<Icon {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it(`${name} renders with context`, () => {
        const contextValue: IkonateContextType = {
            style: 'round',
            size: '30px',
            border: 1,
            color: 'hotpink'
        };
        const wrapper = mount(
            <IkonateContext.Provider value={contextValue}>
                <Icon/>
            </IkonateContext.Provider>
        );
        expect(wrapper.find('svg').props()).toMatchObject({
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 1,
            color: 'hotpink',
            fontSize: '30px'
        });
    });

    it(`${name} renders with context [snapshot]`, () => {
        const contextValue: IkonateContextType = {
            style: 'round',
            size: '30px',
            border: 1,
            color: 'hotpink'
        };
        const wrapper = mount(
            <IkonateContext.Provider value={contextValue}>
                <Icon/>
            </IkonateContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
}

describe('all icons render as espected', () => {
    Object.entries(icons).forEach(testIcon);
});
