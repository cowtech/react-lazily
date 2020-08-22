import { NestedCSSProperties } from 'typestyle/lib/types';
export declare type CSSVarName = keyof NestedCSSProperties;
export declare const centeredContentsStyle: NestedCSSProperties;
export declare const cardStyle: NestedCSSProperties;
export declare function debugClassName($debugName: string, force?: boolean): NestedCSSProperties;
export declare function linkStyle(normalStyle: NestedCSSProperties | string, hoverStyle: NestedCSSProperties | string, normalNestSelector?: string, hoverNestSelector?: string): NestedCSSProperties;
