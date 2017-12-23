import * as React from 'react';

import {css as glamor, media, StyleAttribute} from '@cowtech/glamor';

import {colorWhite, colorRed700, colorAmber200, colorAmber500} from '../styling/colors';

export interface BrowseHappyProps{
  message: string;
}

export function BrowseHappy(props: BrowseHappyProps): JSX.Element{
  const css: StyleAttribute = glamor({
    label: 'browse-happy',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorRed700,
    color: colorWhite,
    padding: '1rem',
    textAlign: 'center',
    '& a': [
      {
        color: colorAmber500,
        fontWeight: 'bold',
        '&:hover, &:focus, &:active': {color: colorAmber500}
      },
      media('(hover)', {':hover': {color: colorAmber200}})
    ]
  });

  const message: string = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';

  return (
    <div id="browseHappy" className={css.toString()}>
      <span>{message}&nbsp;</span>
      <a href="https://browsehappy.com/" className="BrowseHappy__link" target="_blank" rel="noopener">BrowseHappy</a>.
    </div>
  );
}
