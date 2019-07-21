import React from 'react';
export interface IconProps {
    name: string;
    className?: string;
    onClick?(): void;
}
export declare const iconClassName: string;
export declare const iconsDefinitionsClassName: string;
export declare const Icon: React.NamedExoticComponent<IconProps>;
export declare const IconsDefinitions: React.NamedExoticComponent<object>;
