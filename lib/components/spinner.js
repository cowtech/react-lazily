import React from 'react';
import { classes, keyframes, style } from 'typestyle';
import { colorBlack } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
// #region style
export const spinnerClassName = style(debugClassName('spinner'), {
    margin: 'auto'
});
export const spinnerCircleBaseClassName = style(debugClassName('spinner-base-circle'), {
    fill: 'transparent',
    strokeLinecap: 'round',
    transformOrigin: 'center'
});
export const Spinner = createMemoizedComponent('Spinner', function (props) {
    var _a, _b, _c;
    const size = (_a = props.size) !== null && _a !== void 0 ? _a : 66;
    const stroke = (_b = props.stroke) !== null && _b !== void 0 ? _b : 6;
    const remSize = `${size / 10}rem`;
    /* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
    const animation = keyframes({
        '0%': { strokeDashoffset: size * 0.66, transform: 'rotate(0deg)' },
        '50%': { strokeDashoffset: size * 3.14, transform: 'rotate(720deg)' },
        '100%': { strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)' }
    });
    const spinnerImageClassName = style(debugClassName('spinner-image'), {
        width: remSize,
        height: remSize
    });
    const spinnerCircleClassName = style(debugClassName('spinner'), {
        width: remSize,
        height: remSize,
        stroke: (_c = props.color) !== null && _c !== void 0 ? _c : colorBlack,
        strokeWidth: stroke,
        strokeDasharray: [size * 3.14],
        animation: `${animation} 2s linear infinite`
    });
    return (React.createElement("main", { className: classes(spinnerClassName, props.className) },
        React.createElement("svg", { viewBox: `0 0 ${size} ${size}`, className: spinnerImageClassName },
            React.createElement("circle", { fill: "none", strokeWidth: "6", strokeLinecap: "round", cx: size / 2, cy: size / 2, r: (size - stroke) / 2, className: classes(spinnerCircleBaseClassName, spinnerCircleClassName) })),
        props.text && React.createElement("h3", null, props.text)));
});
