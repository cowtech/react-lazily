"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
const colors_1 = require("../styling/colors");
function Spinner(props) {
    // tslint:disable no-magic-numbers
    const size = props.size || 66;
    const stroke = props.stroke || 6;
    /* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
    const animation = glamor_1.keyframes({
        '0%': { strokeDashoffset: size * 0.66, transform: 'rotate(0deg)' },
        '50%': { strokeDashoffset: size * 3.14, transform: 'rotate(720deg)' },
        '100%': { strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)' }
    });
    const css = glamor_1.css({
        label: 'spinner',
        alignSelf: 'center',
        justifySelf: 'center',
        '& svg': {
            width: `${size / 10}rem`,
            height: `${size / 10}rem`
        },
        '& circle': {
            width: `${size / 10}rem`,
            height: `${size / 10}rem`,
            fill: 'transparent',
            stroke: props.color || colors_1.colorBlack,
            strokeWidth: stroke,
            strokeLinecap: 'round',
            strokeDasharray: size * 3.14,
            animation: `${animation} 2s linear infinite`,
            transformOrigin: 'center'
        }
    });
    // tslint:ensable no-magic-numbers
    return (React.createElement("main", { className: css.toString() },
        React.createElement("svg", { viewBox: `0 0 ${size} ${size}` },
            React.createElement("circle", { fill: "none", strokeWidth: "6", strokeLinecap: "round", cx: size / 2, cy: size / 2, r: (size - stroke) / 2 })),
        props.text && React.createElement("h3", { className: "Spinner__title" }, props.text)));
}
exports.Spinner = Spinner;
