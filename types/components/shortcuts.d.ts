/// <reference types="react" />
export interface ShortcutsProps {
    shortcuts: {
        [key: string]: () => void;
    };
}
export declare const Shortcuts: import("react").NamedExoticComponent<ShortcutsProps>;
