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
export declare function checkVersion(currentVersion: string, element?: HTMLDivElement): Promise<boolean>;
export declare function updateVersion(ev: React.MouseEvent<HTMLElement>): void;
export declare const newVersionCheckerclassName: string;
export declare class NewVersionChecker extends React.Component<NewVersionCheckerProps, NewVersionCheckerState> {
    state: {
        newVersionAvailable: boolean;
    };
    render(): JSX.Element;
    componentDidMount(): Promise<void>;
    handleClick(ev: React.MouseEvent<HTMLElement>): Promise<void>;
}
export declare const NewVersionCheckerSSR: string;
