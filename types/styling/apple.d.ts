/// <reference types="react" />
export interface SplashDictionary {
    [key: string]: string;
}
export interface ScreenSize {
    id: string;
    devices: Array<string>;
    width: number;
    height: number;
    ratio: number;
}
export declare const appleScreenSizes: Array<ScreenSize>;
export declare function generateAppleSplashTags(url: string | SplashDictionary, includeLandscape?: boolean, whitelist?: Array<string>): Array<JSX.Element>;
