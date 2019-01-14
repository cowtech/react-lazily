import { percent, rem } from 'csx';
import * as React from 'react';
import { style } from 'typestyle';
import { colorAmber200, colorAmber500, colorGreen900, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
export function listenForUpdates(currentVersion, callback) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        if (type === 'new-version-available' && payload.version !== currentVersion)
            callback(payload.version);
    });
}
export function updateVersion(ev) {
    ev.preventDefault();
    location.reload();
}
export const newVersionCheckerClassName = style(debugClassName('new-version-checker'), {
    width: percent(100),
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorGreen900,
    color: colorWhite,
    padding: rem(1),
    paddingTop: `max(${rem(1)}, env(safe-area-inset-top))`,
    paddingLeft: `max(${rem(1)}, env(safe-area-inset-left))`,
    paddingRight: `max(${rem(1)}, env(safe-area-inset-right))`,
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
export class NewVersionChecker extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.boundHandleClick = this.handleClick.bind(this);
        this.state = { newVersionAvailable: false };
    }
    render() {
        // The check on window is for SSR
        if (typeof window !== 'undefined' && !this.state.newVersionAvailable)
            return null; // tslint:disable-line strict-type-predicates
        const message = this.props.message || 'There is a shiny new version.';
        const action = this.props.action || 'Update now!';
        return (React.createElement("div", { id: "newVersionChecker", className: newVersionCheckerClassName, "data-current-version": this.props.currentVersion, "data-hidden": typeof window === 'undefined' || !this.state.newVersionAvailable },
            React.createElement("span", null,
                message,
                "\u00A0"),
            React.createElement("a", { href: "#", onClick: this.boundHandleClick }, action)));
    }
    componentDidMount() {
        listenForUpdates(this.props.currentVersion, () => this.setState({ newVersionAvailable: true }));
    }
    async handleClick(ev) {
        ev.preventDefault();
        location.reload(true); // tslint:disable-line deprecation
    }
}
export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${listenForUpdates}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker')

    element.querySelector('a').addEventListener('click', updateVersion, false)
    listenForUpdates(element.getAttribute('data-current-version'), () => element.removeAttribute('data-hidden'))
  });
`;
