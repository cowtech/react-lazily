import React, { useEffect, useState } from 'react';
import { classes, style } from 'typestyle';
import { colorAmber200, colorAmber500, colorGreen900, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
// #region style
export const newVersionCheckerClassName = style(debugClassName('new-version-checker'), {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorGreen900,
    color: colorWhite,
    paddingTop: 'calc(1rem + env(safe-area-inset-top))',
    paddingBottom: '1rem',
    paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
    paddingRight: 'calc(1rem + env(safe-area-inset-right))',
    textAlign: 'center'
});
export const newVersionCheckerHiddenClassName = style(debugClassName('new-version-checker-hidden'), {
    $unique: true,
    display: 'none'
});
export const newVersionCheckerLinkClassName = style(debugClassName('new-version-checker-link'), {
    $unique: true,
    color: colorAmber500,
    fontWeight: 'bold',
    $nest: {
        '&:hover, &:focus, &:active': { color: colorAmber200 }
    }
});
// #endregion style
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
    location.reload(true);
}
export const NewVersionChecker = createMemoizedComponent('NewVersionChecker', function ({ currentVersion, message, className, action }) {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);
    useEffect(() => {
        listenForUpdates(currentVersion, () => setNewVersionAvailable(true));
    }, []);
    // The check on window is for SSR
    if (typeof window !== 'undefined' && !newVersionAvailable) {
        return null;
    }
    message = message !== null && message !== void 0 ? message : 'There is a shiny new version.';
    action = action !== null && action !== void 0 ? action : 'Update now!';
    return (React.createElement("div", { id: "newVersionChecker", className: classes(newVersionCheckerClassName, (typeof window === 'undefined' || !newVersionAvailable) && newVersionCheckerHiddenClassName, className), "data-current-version": currentVersion },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "#", onClick: updateVersion, className: newVersionCheckerLinkClassName }, action)));
});
export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${listenForUpdates};
    ${updateVersion};

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);
    
    listenForUpdates(element.getAttribute('data-current-version'), () => {
      element.classList.remove('${newVersionCheckerHiddenClassName}');
    });
  });
`;
