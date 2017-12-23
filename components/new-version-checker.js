"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
const colors_1 = require("../styling/colors");
// TODO@PI: SSR support
class NewVersionChecker extends React.Component {
    constructor() {
        super(...arguments);
        this.css = glamor_1.css({
            label: 'new-version-checker',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
            backgroundColor: colors_1.colorGreen900,
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
        this.state = { newVersionAvailable: false };
    }
    render() {
        if (!this.state.newVersionAvailable)
            return null;
        const message = this.props.message || 'There is a shiny new version.';
        const action = this.props.action || 'Update now!';
        return (React.createElement("div", { id: "newVersionChecker", className: this.css.toString() },
            React.createElement("span", null,
                message,
                "\u00A0"),
            React.createElement("a", { href: "#", onClick: this.handleClick.bind(this) }, action)));
    }
    async componentDidMount() {
        try {
            // No new workers or SW available, use the manifest
            const manifest = await (await fetch('/manifest.json', { cache: 'no-store', headers: [['Cache-Control', 'no-cache']] })).json();
            this.setState(() => ({ newVersionAvailable: this.props.currentVersion !== manifest.version }));
        }
        catch (e) {
            // Ignore errors here
        }
    }
    async handleClick(ev) {
        ev.preventDefault();
        location.reload(true);
    }
}
exports.NewVersionChecker = NewVersionChecker;
