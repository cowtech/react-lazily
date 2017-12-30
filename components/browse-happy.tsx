import * as React from 'react';

import {percent, rem} from 'csx';
import {style} from 'typestyle';

import {colorWhite, colorRed700, colorAmber200, colorAmber500} from '../styling/colors';

export interface BrowseHappyProps{
  message?: string;
}

export const browseHappyClassName: string = style(
  {
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
      '&[data-hidden=true]': {display: 'none'},
      '& a': {
        color: colorAmber500,
        fontWeight: 'bold',
        $nest: {
          '&:hover, &:focus, &:active': {color: colorAmber200}
        }
      }
    }
  }
);

export function BrowseHappy(props: BrowseHappyProps): JSX.Element{
  const message: string = props.message || 'Your browser is obsolete. For the best browsing experience, update it for free by visiting';

  return (
    <div id="browseHappy" className={browseHappyClassName} data-hidden={typeof window === 'undefined'}>
      <span>{message}&nbsp;</span>
      <a href="https://browsehappy.com/" target="_blank" rel="noopener">BrowseHappy</a>.
    </div>
  );
}

export const BrowseHappySSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    const element = document.getElementById('browseHappy');

    if(navigator.userAgent.indexOf('MSIE') !== -1 || typeof CSS.supports !== 'function' || !CSS.supports('display', 'grid') || !CSS.supports('display', 'flex'))
      element.removeAttribute('data-hidden');
    else
      element.remove();
  });
`;
