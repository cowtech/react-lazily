/// <reference types="react" />
import * as React from 'react';
export interface IconProps {
    name: string;
    className?: string;
}
export declare class Icon extends React.Component<IconProps> {
    private css;
    render(): JSX.Element;
}
export declare class IconsDefinitions extends React.Component {
    render(): JSX.Element;
    shouldComponentUpdate(): boolean;
}
