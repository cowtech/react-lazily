"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ribbon_1 = require("./ribbon");
class MadeInItaly extends React.PureComponent {
    render() {
        return React.createElement(ribbon_1.Ribbon, Object.assign({}, this.props),
            React.createElement("a", { href: "http://www.italia.it", target: "_blank", rel: "noopener noreferrer" }, "Made by a proud Italian!"));
    }
}
exports.MadeInItaly = MadeInItaly;
