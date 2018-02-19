import * as React from 'react';
import { percent, rem } from 'csx';
import { style } from 'typestyle';
import { colorWhite, colorGreen900, colorAmber200, colorAmber500 } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
export async function checkVersion(currentVersion, element) {
    try {
        // No new workers or SW available, use the manifest
        const manifest = await (await fetch('/manifest.json', { cache: 'no-store', headers: [['Cache-Control', 'no-cache']] })).json();
        const newVersionAvailable = currentVersion !== manifest.version;
        if (element) {
            if (newVersionAvailable)
                element.removeAttribute('data-hidden');
            else
                element.remove();
        }
        return currentVersion !== manifest.version;
    }
    catch (e) {
        // No error checking required. Just assume there is no version
        return false;
    }
}
export function updateVersion(ev) {
    ev.preventDefault();
    location.reload(true);
}
export const newVersionCheckerclassName = style(debugClassName('new-version-checker'), {
    width: percent(100),
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorGreen900,
    color: colorWhite,
    padding: rem(1),
    textAlign: 'center',
    $nest: {
        '&[data-hidden=true]': { display: 'none' },
        '& a': {
            color: colorAmber500,
            fontWeight: 'bold',
            $nest: {
                '&:hover, &:focus, &:active': { color: colorAmber200 }
            }
        }
    }
});
export class NewVersionChecker extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { newVersionAvailable: false };
    }
    render() {
        if (typeof window !== 'undefined' && !this.state.newVersionAvailable)
            return null;
        const message = this.props.message || 'There is a shiny new version.';
        const action = this.props.action || 'Update now!';
        return (React.createElement("div", { id: "newVersionChecker", className: newVersionCheckerclassName, "data-current-version": this.props.currentVersion, "data-hidden": typeof window === 'undefined' || !this.state.newVersionAvailable },
            React.createElement("span", null,
                message,
                "\u00A0"),
            React.createElement("a", { href: "#", onClick: this.handleClick.bind(this) }, action)));
    }
    async componentDidMount() {
        const newVersionAvailable = await checkVersion(this.props.currentVersion);
        this.setState(() => ({ newVersionAvailable }));
    }
    async handleClick(ev) {
        ev.preventDefault();
        location.reload(true);
    }
}
export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${checkVersion}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);

    checkVersion(element.getAttribute('data-current-version'), element);
  });
`;