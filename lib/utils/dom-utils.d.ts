import React from 'react';
export declare type BoundHandler = (...args: Array<any>) => void | Promise<void>;
export declare function handleIOSMinHeight(offset: number): void;
export declare function loadScript(url: string, tag: string): Promise<void>;
export declare function emptyBoundHandler(): void;
export declare function createMemoizedComponent<Props extends object>(name: string, component: React.FunctionComponent<Props>): React.NamedExoticComponent<Props>;
