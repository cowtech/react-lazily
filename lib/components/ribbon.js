import { percent, px, rem } from 'csx';
import React from 'react';
import { classes, media, style } from 'typestyle';
import { maxWidth6xx } from '../styling/breakpoints';
import { colorGrey500, colorGrey800 } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
export const Ribbon = React.memo(function ({ position, className, children }) {
    let positionCss = null;
    // ${percent(29.28)} = ${percent(100)} - (${percent(100)} / sqrt(2))
    switch (position) {
        case 'top-left':
            positionCss = {
                top: 0,
                left: 0,
                bottom: 'auto',
                right: 'auto',
                transform: `translate(${percent(-29.28)}, ${percent(-100)}) rotate(-45deg)`,
                transformOrigin: 'bottom right'
            };
            break;
        case 'bottom-left':
            positionCss = {
                top: 'auto',
                left: 0,
                bottom: 0,
                right: 'auto',
                transform: `translate(${percent(-29.28)}, ${percent(100)}) rotate(45deg)`,
                transformOrigin: 'top right'
            };
            break;
        case 'bottom-right':
            positionCss = {
                top: 'auto',
                left: 'auto',
                bottom: 0,
                right: 0,
                transform: `translate(${percent(29.28)}, ${percent(100)}) rotate(-45deg)`,
                transformOrigin: 'top left'
            };
            break;
        default:
            // top-right by default
            positionCss = {
                top: 0,
                left: 'auto',
                bottom: 'auto',
                right: 0,
                transform: `translate(${percent(29.28)}, ${percent(-100)}) rotate(45deg)`,
                transformOrigin: 'bottom left'
            };
            break;
    }
    const baseClassName = style(debugClassName('ribbon'), {
        position: 'fixed',
        backfaceVisibility: 'hidden',
        zIndex: 99,
        border: `${px(1)} solid ${colorGrey800}`,
        boxShadow: `0 0 ${rem(0.5)} ${colorGrey500}`,
        padding: `0 ${percent(2)}`,
        textAlign: 'center'
    }, positionCss, media({ maxWidth: maxWidth6xx }, { display: 'none' }));
    return React.createElement("div", { className: classes(baseClassName, className) }, children);
});
Ribbon.displayName = 'Ribbon';
