/// <reference types="react" />
import * as React from 'react';
export interface NewVersionCheckerProps {
    currentVersion: string;
    message?: string;
    action?: string;
}
export interface NewVersionCheckerState {
    newVersionAvailable: boolean;
}
export declare class NewVersionChecker extends React.Component<NewVersionCheckerProps, NewVersionCheckerState> {
    private css;
    state: {
        newVersionAvailable: boolean;
    };
    render(): JSX.Element;
    componentDidMount(): Promise<void>;
    handleClick(ev: React.MouseEvent<HTMLElement>): Promise<void>;
}
