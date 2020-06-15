import React, { MouseEvent } from 'react';
export declare const topAnchorHiddenClassName: string;
export declare function animationProgress(startTime: number, duration: number): number;
export declare function ease(x: number): number;
export declare function updateTopAnchorStatus(element: HTMLAnchorElement, klass: string): void;
export declare function scrollToTop(ev: MouseEvent, duration: number): void;
export interface TopAnchorProps {
    duration?: number;
    backgroundColor?: string;
    foregroundColor?: string;
    className?: string;
}
export declare const TopAnchor: React.NamedExoticComponent<TopAnchorProps>;
export declare const TopAnchorSSR: string;
