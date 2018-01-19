import * as React from 'react';
import { percent, rem } from 'csx';
import { style } from 'typestyle';
import { colorWhite, colorRed700, colorAmber200, colorAmber500 } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
export function isModernBrowser() {
    try {
        return Array.from(new Map([[1, 2]]).entries()).join(',') === '1,2' && CSS.supports('display', 'grid') && CSS.supports('display', 'flex');
    }
    catch (e) {
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
export function BrowseHappy(props) {
    const message = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';
    return (React.createElement("div", { id: "browseHappy", className: browseHappyClassName, "data-hidden": typeof window === 'undefined' },
        React.createElement("span", null,
            message,
            "\u00A0"),
        React.createElement("a", { href: "https://browsehappy.com/", target: "_blank", rel: "noopener" }, "BrowseHappy"),
        "."));
}
export const BrowseHappySSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${isModernBrowser}

    const element = document.getElementById('browseHappy');

    if(isModernBrowser())
      element.remove();
    else
      element.removeAttribute('data-hidden');
  });
`;
