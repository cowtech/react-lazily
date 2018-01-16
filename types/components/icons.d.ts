/// <reference types="react" />
export interface IconProps {
    name: string;
    className?: string;
    onClick?(): void;
}
export declare const iconClassName: string;
export declare const iconsDefinitionsClassName: string;
export declare function Icon(props: IconProps): JSX.Element;
export declare function IconsDefinitions(): JSX.Element;
