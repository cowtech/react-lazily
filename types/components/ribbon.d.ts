import React, { ReactNode } from 'react';
export interface RibbonProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
    children?: ReactNode;
}
export declare const Ribbon: React.NamedExoticComponent<RibbonProps>;
