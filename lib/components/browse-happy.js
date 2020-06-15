import React from 'react';
import { classes, style } from 'typestyle';
import { colorAmber200, colorAmber500, colorRed700, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
// #region style
export const browseHappyClassName = style(debugClassName('browse-happy'), {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorRed700,
    color: colorWhite,
    paddingTop: '1rem',
    paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
    paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
    paddingRight: 'calc(1rem + env(safe-area-inset-right))',
    textAlign: 'center'
});
export const browseHappyHiddenClassName = style(debugClassName('browse-happy-hidden'), {
    $unique: true,
    display: 'none'
});
export const browseHappyLinkClassName = style(debugClassName('browse-happy-link'), {
    $unique: true,
    color: colorAmber500,
    fontWeight: 'bold',
    $nest: {
        '&:hover, &:focus, &:active': { color: colorAmber200 }
    }
});
// #endregion style
export function isModernBrowser() {
    try {
        return (Array.from(new Map([[1, 2]]).entries()).join(',') === '1,2' &&
            CSS.supports('display', 'grid') &&
            CSS.supports('display', 'flex') &&
            CSS.supports('color', 'var(--var)'));
    }
    catch (e) {
        // Some of these are not supported. Assume legacy browser.
        return false;
    }
}
export const BrowseHappy = createMemoizedComponent('BrowseHappy', function ({ message, className }) {
    message = message !== null && message !== void 0 ? message : 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';
    return (React.createElement("div", { id: "browseHappy", className: classes(browseHappyClassName, typeof window === 'undefined' && browseHappyHiddenClassName, className) },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "https://browsehappy.com/", target: "_blank", rel: "noopener noreferrer", className: browseHappyLinkClassName }, "BrowseHappy"),
        "."));
});
export const BrowseHappySSR = `
  document.addEventListener('DOMContentLoaded', function() {
    ${isModernBrowser};

    const element = document.getElementById('browseHappy');
    
    if(isModernBrowser()) {
      element.remove();
    } else {
      element.classList.remove('${browseHappyHiddenClassName}');
    }
  });
`;
