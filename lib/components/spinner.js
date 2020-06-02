import { percent, rem } from 'csx';
import React from 'react';
import { classes, keyframes, style } from 'typestyle';
import { colorBlack } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
export const Spinner = createMemoizedComponent('Spinner', function (props) {
    var _a, _b, _c;
    const size = (_a = props.size) !== null && _a !== void 0 ? _a : 66;
    const stroke = (_b = props.stroke) !== null && _b !== void 0 ? _b : 6;
    /* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
    const animation = keyframes({
        [percent(0)]: { strokeDashoffset: size * 0.66, transform: 'rotate(0deg)' },
        [percent(50)]: { strokeDashoffset: size * 3.14, transform: 'rotate(720deg)' },
        [percent(100)]: { strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)' }
    });
    const spinnerClassName = style(debugClassName('spinner'), {
        alignSelf: 'center',
        justifySelf: 'center',
        $nest: {
            '& svg': {
                width: rem(size / 10),
                height: rem(size / 10)
            },
            '& circle': {
                width: rem(size / 10),
                height: rem(size / 10),
                fill: 'transparent',
                stroke: (_c = props.color) !== null && _c !== void 0 ? _c : colorBlack,
                strokeWidth: stroke,
                strokeLinecap: 'round',
                strokeDasharray: [size * 3.14],
                animation: `${animation} 2s linear infinite`,
                transformOrigin: 'center'
            }
        }
    });
    return (React.createElement("main", { className: classes(spinnerClassName, props.className) },
        React.createElement("svg", { viewBox: `0 0 ${size} ${size}` },
            React.createElement("circle", { fill: "none", strokeWidth: "6", strokeLinecap: "round", cx: size / 2, cy: size / 2, r: (size - stroke) / 2 })),
        props.text && React.createElement("h3", null, props.text)));
});
