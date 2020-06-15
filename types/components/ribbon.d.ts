import React, { ReactNode } from 'react';
export declare const ribbonPositionsClassesNames: {
    'top-left': string;
    'top-right': string;
    'bottom-right': string;
    'bottom-left': string;
};
export interface RibbonProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
    children?: ReactNode;
}
export declare const Ribbon: React.NamedExoticComponent<RibbonProps>;
