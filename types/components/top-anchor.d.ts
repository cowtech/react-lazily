/// <reference types="react" />
import * as React from 'react';
export interface TopAnchorProps {
    duration?: number;
    backgroundColor?: string;
    foregroundColor?: string;
}
export declare function animationProgress(startTime: number, duration: number): number;
export declare function ease(x: number): number;
export declare function handleScroll(element: HTMLAnchorElement): void;
export declare function handleScrollToTop(ev: React.MouseEvent<HTMLElement>, duration: number): void;
export declare class TopAnchor extends React.Component<TopAnchorProps> {
    private element;
    private scrollHandler;
    private className;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(): boolean;
    handleScroll(): void;
    handleScrollToTop(ev: React.MouseEvent<HTMLElement>): void;
}
export declare const TopAnchorSSR: string;
