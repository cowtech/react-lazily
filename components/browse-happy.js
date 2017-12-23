"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
const colors_1 = require("../styling/colors");
function BrowseHappy(props) {
    const css = glamor_1.css({
        label: 'browse-happy',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: colors_1.colorRed700,
        color: colors_1.colorWhite,
        padding: '1rem',
        textAlign: 'center',
        '& a': [
            {
                color: colors_1.colorAmber500,
                fontWeight: 'bold',
                '&:hover, &:focus, &:active': { color: colors_1.colorAmber500 }
            },
            glamor_1.media('(hover)', { ':hover': { color: colors_1.colorAmber200 } })
        ]
    });
    const message = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';
    return (React.createElement("div", { id: "browseHappy", className: css.toString() },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "https://browsehappy.com/", className: "BrowseHappy__link", target: "_blank", rel: "noopener" }, "BrowseHappy"),
        "."));
}
exports.BrowseHappy = BrowseHappy;
