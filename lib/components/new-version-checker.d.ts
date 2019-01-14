import * as React from 'react';
export interface NewVersionCheckerProps {
    currentVersion: string;
    message?: string;
    action?: string;
}
export interface NewVersionCheckerState {
    newVersionAvailable: boolean;
}
export declare function listenForUpdates(currentVersion: string, callback: (newVersion: string) => void): void;
export declare function updateVersion(ev: React.MouseEvent): void;
export declare const newVersionCheckerClassName: string;
export declare class NewVersionChecker extends React.PureComponent<NewVersionCheckerProps, NewVersionCheckerState> {
    private boundHandleClick;
    state: NewVersionCheckerState;
    render(): JSX.Element | null;
    componentDidMount(): void;
    handleClick(ev: React.MouseEvent): Promise<void>;
}
export declare const NewVersionCheckerSSR: string;
