import { percent, rem } from 'csx';
import React, { useEffect, useState } from 'react';
import { style } from 'typestyle';
import { colorAmber200, colorAmber500, colorGreen900, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
export function listenForUpdates(currentVersion, callback) {
    if (!navigator.serviceWorker) {
        return;
    }
    navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        if (type === 'new-version-available' && payload.version !== currentVersion) {
            callback(payload.version);
        }
    });
}
export function updateVersion(ev) {
    ev.preventDefault();
    location.reload(true); // tslint:disable-line deprecation
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
    paddingTop: `calc(${rem(1)} + env(safe-area-inset-top))`,
    paddingBottom: rem(1),
    paddingLeft: `calc(${rem(1)} + env(safe-area-inset-left))`,
    paddingRight: `calc(${rem(1)} + env(safe-area-inset-right))`,
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
export const NewVersionChecker = createMemoizedComponent('NewVersionChecker', function ({ currentVersion, message, action }) {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);
    useEffect(() => {
        listenForUpdates(currentVersion, () => setNewVersionAvailable(true));
    }, []);
    // The check on window is for SSR
    // tslint:disable-next-line strict-type-predicates
    if (typeof window !== 'undefined' && !newVersionAvailable) {
        return null;
    }
    message = message !== null && message !== void 0 ? message : 'There is a shiny new version.';
    action = action !== null && action !== void 0 ? action : 'Update now!';
    return (React.createElement("div", { id: "newVersionChecker", className: newVersionCheckerClassName, "data-current-version": currentVersion, "data-hidden": typeof window === 'undefined' || !newVersionAvailable },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "#", onClick: updateVersion }, action)));
});
export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${listenForUpdates}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker')

    element.querySelector('a').addEventListener('click', updateVersion, false)
    listenForUpdates(element.getAttribute('data-current-version'), () => element.removeAttribute('data-hidden'))
  });
`;
