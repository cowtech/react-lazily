import React, { MouseEvent } from 'react';
export declare const newVersionCheckerClassName: string;
export declare const newVersionCheckerHiddenClassName: string;
export declare const newVersionCheckerLinkClassName: string;
export declare function listenForUpdates(currentVersion: string, callback: (newVersion: string) => void): void;
export declare function updateVersion(ev: MouseEvent): void;
export interface NewVersionCheckerProps {
    currentVersion: string;
    message?: string;
    className?: string;
    action?: string;
}
export interface NewVersionCheckerState {
    newVersionAvailable: boolean;
}
export declare const NewVersionChecker: React.NamedExoticComponent<NewVersionCheckerProps>;
export declare const NewVersionCheckerSSR: string;
