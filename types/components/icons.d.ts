import React from 'react';
export declare const iconClassName: string;
export declare const iconsDefinitionsClassName: string;
export interface IconProps {
    name: string;
    className?: string;
    onClick?(): void;
}
export declare const Icon: React.NamedExoticComponent<IconProps>;
export declare const IconsDefinitions: React.NamedExoticComponent<object>;
