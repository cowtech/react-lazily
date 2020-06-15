import React from 'react';
import { classes, style } from 'typestyle';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
// #region style
export const iconClassName = style(debugClassName('icon'), {
    width: '1em',
    height: '1em',
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
export const Icon = createMemoizedComponent('Icon', function ({ name, className, onClick }) {
    const icon = ICONS.tags[name];
    if (!icon) {
        throw new Error(`Missing icon ${name}.`);
    }
    return (React.createElement("svg", { className: classes(iconClassName, `Icon-${name}`, className), onClick: onClick },
        React.createElement("use", { xlinkHref: `#${icon.toString()}` })));
});
export const IconsDefinitions = createMemoizedComponent('IconsDefinitions', function () {
    return (React.createElement("svg", { className: iconsDefinitionsClassName, version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
        React.createElement("defs", { dangerouslySetInnerHTML: { __html: ICONS.definitions } })));
});
