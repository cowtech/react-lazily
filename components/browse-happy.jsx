import * as React from 'react';
import { style } from 'typestyle';
import { colorWhite, colorRed700, colorAmber200, colorAmber500 } from '../styling/colors';
export function BrowseHappy(props) {
    const className = style({
        $debugName: 'browse-happy',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: colorRed700,
        color: colorWhite,
        padding: '1rem',
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
    const message = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';
    return (<div id="browseHappy" className={className}>
      <span>{message}&nbsp;</span>
      <a href="https://browsehappy.com/" className="BrowseHappy__link" target="_blank" rel="noopener">BrowseHappy</a>.
    </div>);
}
