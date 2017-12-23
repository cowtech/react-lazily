"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
class Icon extends React.Component {
    constructor() {
        super(...arguments);
        this.css = glamor_1.css({
            label: 'icon',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'middle',
            strokeWidth: 0,
            stroke: 'currentColor',
            fill: 'currentColor'
        });
    }
    render() {
        const icon = ICONS.tags[this.props.name];
        if (!icon) {
            console.error(`Missing icon ${this.props.name}.`);
            return null;
        }
        return React.createElement("svg", { className: `${this.css.toString()} Icon-${this.props.name} ${this.props.className || ''}` },
            React.createElement("use", { xlinkHref: `#${icon.toString()}` }));
    }
}
exports.Icon = Icon;
class IconsDefinitions extends React.Component {
    render() {
        const css = glamor_1.css({
            label: 'icons-definitions',
            width: 0,
            height: 0,
            display: 'none',
            position: 'absolute',
            overflow: 'hidden'
        });
        return (React.createElement("svg", { className: css.toString(), version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
            React.createElement("defs", { dangerouslySetInnerHTML: { __html: ICONS.definitions } })));
    }
    shouldComponentUpdate() {
        return false;
    }
}
exports.IconsDefinitions = IconsDefinitions;
