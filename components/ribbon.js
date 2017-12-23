"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
const breakpoints_1 = require("../styling/breakpoints");
const colors_1 = require("../styling/colors");
class Ribbon extends React.PureComponent {
    render() {
        let positionCss = null;
        // 29.28% = 100% - (100% / sqrt(2))
        switch (this.props.position) {
            case 'top-left':
                positionCss = { top: 0, left: 0, bottom: 'auto', right: 'auto', transform: 'translate(-29.28%, -100%) rotate(45deg)', transformOrigin: 'bottom right' };
                break;
            case 'bottom-left':
                positionCss = { top: 'auto', left: 0, bottom: 0, right: 'auto', transform: 'translate(-29.28%, 100%) rotate(-45deg)', transformOrigin: 'top right' };
                break;
            case 'bottom-right':
                positionCss = { top: 'auto', left: 'auto', bottom: 0, right: 0, transform: 'translate(29.28%, 100%) rotate(45deg)', transformOrigin: 'top left' };
                break;
            default:
                positionCss = { top: 0, left: 'auto', bottom: 'auto', right: 0, transform: 'translate(29.28%, -100%) rotate(-45deg)', transformOrigin: 'bottom left' };
                break;
        }
        const css = glamor_1.css({
            label: 'ribbon',
            position: 'fixed',
            backfaceVisibility: 'hidden',
            zIndex: 99,
            border: `1px solid ${colors_1.colorGrey800}`,
            boxShadow: `0 0 0.5rem ${colors_1.colorGrey500}`
        }, positionCss, glamor_1.media(breakpoints_1.breakpointMaxWidth6xx, { display: 'none' }));
        return React.createElement("div", { className: css.toString() }, this.props.children);
    }
}
exports.Ribbon = Ribbon;
