import React, { MouseEvent } from 'react';
export interface NewVersionCheckerProps {
    currentVersion: string;
    message?: string;
    action?: string;
}
export interface NewVersionCheckerState {
    newVersionAvailable: boolean;
}
export declare function listenForUpdates(currentVersion: string, callback: (newVersion: string) => void): void;
export declare function updateVersion(ev: MouseEvent): void;
export declare const newVersionCheckerClassName: string;
export declare const NewVersionChecker: React.NamedExoticComponent<NewVersionCheckerProps>;
export declare const NewVersionCheckerSSR: string;
