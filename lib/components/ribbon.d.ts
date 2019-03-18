import React from 'react';
export interface RibbonProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
    children?: React.ReactNode;
}
export declare const Ribbon: React.NamedExoticComponent<RibbonProps>;
