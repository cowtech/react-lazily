import { percent, rem } from 'csx';
import React from 'react';
import { style } from 'typestyle';
import { colorAmber200, colorAmber500, colorRed700, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
export function isModernBrowser() {
    try {
        return (Array.from(new Map([[1, 2]]).entries()).join(',') === '1,2' &&
            CSS.supports('display', 'grid') &&
            CSS.supports('display', 'flex'));
    }
    catch (e) {
        // Some of these are not supported. Assume legacy browser.
        return false;
    }
}
export const browseHappyClassName = style(debugClassName('browse-happy'), {
    width: percent(100),
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorRed700,
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
export const BrowseHappy = React.memo(function (props) {
    const message = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';
    return (React.createElement("div", { id: "browseHappy", className: browseHappyClassName, "data-hidden": typeof window === 'undefined' },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "https://browsehappy.com/", target: "_blank", rel: "noopener" }, "BrowseHappy"),
        "."));
});
BrowseHappy.displayName = 'BrowseHappy';
export const BrowseHappySSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${isModernBrowser}

    const element = document.getElementById('browseHappy')
    if(isModernBrowser()) element.remove()
    else element.removeAttribute('data-hidden')
  });
`;
