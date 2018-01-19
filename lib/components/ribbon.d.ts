/// <reference types="react" />
import * as React from 'react';
export interface RibbonProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
}
export declare class Ribbon extends React.PureComponent<RibbonProps> {
    render(): JSX.Element;
}
