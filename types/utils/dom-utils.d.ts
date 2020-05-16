import { FunctionComponent, NamedExoticComponent } from 'react';
export declare function handleIOSMinHeight(offset?: number): void;
export declare function loadScript(url: string, tag: string): Promise<void>;
export declare function createMemoizedComponent<Props extends object>(name: string, component: FunctionComponent<Props>): NamedExoticComponent<Props>;
