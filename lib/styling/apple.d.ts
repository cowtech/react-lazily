/// <reference types="react" />
export interface ScreenSize {
    id: string;
    label?: string;
    width: number;
    height: number;
    ratio: number;
}
export declare const appleScreenSizes: Array<ScreenSize>;
export declare function generateAppleSplashTags(url: string, whitelist?: Array<string>): Array<JSX.Element>;
