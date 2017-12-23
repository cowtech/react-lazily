/// <reference types="react" />
import * as React from 'react';
export interface TopAnchorProps {
    duration: number;
    backgroundColor: string;
    foregroundColor: string;
}
export declare class TopAnchor extends React.Component<TopAnchorProps> {
    static animationProgress(startTime: number, duration?: number): number;
    static ease(x: number): number;
    private element;
    private scrollHandler;
    private css;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(): boolean;
    handleScroll(): void;
    handleScrollToTop(ev: React.MouseEvent<HTMLElement>): void;
}
