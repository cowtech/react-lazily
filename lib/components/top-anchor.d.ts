import React from 'react';
export interface TopAnchorProps {
    duration?: number;
    backgroundColor?: string;
    foregroundColor?: string;
}
export declare function animationProgress(startTime: number, duration: number): number;
export declare function ease(x: number): number;
export declare function updateTopAnchorStatus(element: HTMLAnchorElement): void;
export declare function scrollToTop(ev: React.MouseEvent, duration: number): void;
export declare const TopAnchor: React.NamedExoticComponent<TopAnchorProps>;
export declare const TopAnchorSSR: string;
