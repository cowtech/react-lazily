import { em } from 'csx';
import React from 'react';
import { classes, style } from 'typestyle';
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
export const Icon = React.memo(function ({ name, className, onClick }) {
    const icon = ICONS.tags[name];
    if (!icon) {
        console.error(`Missing icon ${name}.`);
        return null;
    }
    return (React.createElement("svg", { className: classes(iconClassName, `Icon-${name}`, className), onClick: onClick },
        React.createElement("use", { xlinkHref: `#${icon.toString()}` })));
});
export const IconsDefinitions = React.memo(function () {
    return (React.createElement("svg", { className: iconsDefinitionsClassName, version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
        React.createElement("defs", { dangerouslySetInnerHTML: { __html: ICONS.definitions } })));
});
