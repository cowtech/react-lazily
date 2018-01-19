import * as React from 'react';
import { em } from 'csx';
import { style, classes } from 'typestyle';
import { debugClassName } from '../styling/mixins';
export const iconClassName = style(debugClassName('icon'), {
    width: em(1),
    height: em(1),
    display: 'inline-block',
    verticalAlign: 'middle',
    strokeWidth: 0,
    stroke: 'currentColor',
    fill: 'currentColor'
});
export const iconsDefinitionsClassName = style(debugClassName('icons-definitions'), {
    width: 0,
    height: 0,
    display: 'none',
    position: 'absolute',
    overflow: 'hidden'
});
export function Icon(props) {
    const icon = ICONS.tags[props.name];
    if (!icon) {
        console.error(`Missing icon ${props.name}.`);
        return null;
    }
    return (React.createElement("svg", { className: classes(iconClassName, `Icon-${props.name}`, props.className), onClick: props.onClick },
        React.createElement("use", { xlinkHref: `#${icon.toString()}` })));
}
export function IconsDefinitions() {
    return (React.createElement("svg", { className: iconsDefinitionsClassName, version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
        React.createElement("defs", { dangerouslySetInnerHTML: { __html: ICONS.definitions } })));
}
