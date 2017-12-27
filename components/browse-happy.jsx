import * as React from 'react';
import { percent, rem } from 'csx';
import { style } from 'typestyle';
import { colorWhite, colorRed700, colorAmber200, colorAmber500 } from '../styling/colors';
export const browseHappyClassName = style({
    $debugName: 'browse-happy',
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
    return (<div id="browseHappy" className={browseHappyClassName}>
      <span>{message}&nbsp;</span>
      <a href="https://browsehappy.com/" target="_blank" rel="noopener">BrowseHappy</a>.
    </div>);
}
