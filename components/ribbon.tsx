import * as React from 'react';

import {css as glamor, media, StyleAttribute} from '@cowtech/glamor';

import {breakpointMaxWidth6xx} from '../styling/breakpoints';
import {colorGrey500, colorGrey800} from '../styling/colors';

export interface RibbonProps{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export class Ribbon extends React.PureComponent<RibbonProps>{
  render(): JSX.Element{
    let positionCss: any = null;

    // 29.28% = 100% - (100% / sqrt(2))
    switch(this.props.position){
      case 'top-left':
        positionCss = {top: 0, left: 0, bottom: 'auto', right: 'auto', transform: 'translate(-29.28%, -100%) rotate(45deg)', transformOrigin: 'bottom right'};
        break;
      case 'bottom-left':
        positionCss = {top: 'auto', left: 0, bottom: 0, right: 'auto', transform: 'translate(-29.28%, 100%) rotate(-45deg)', transformOrigin: 'top right'};
        break;
      case 'bottom-right':
        positionCss = {top: 'auto', left: 'auto', bottom: 0, right: 0, transform: 'translate(29.28%, 100%) rotate(45deg)', transformOrigin: 'top left'};
        break;
      default: // top-right by default
        positionCss = {top: 0, left: 'auto', bottom: 'auto', right: 0, transform: 'translate(29.28%, -100%) rotate(-45deg)', transformOrigin: 'bottom left'};
        break;
    }

    const css: StyleAttribute = glamor(
      {
        label: 'ribbon',
        position: 'fixed',
        backfaceVisibility: 'hidden',
        zIndex: 99,
        border: `1px solid ${colorGrey800}`,
        boxShadow: `0 0 0.5rem ${colorGrey500}`
      },
      positionCss,
      media(breakpointMaxWidth6xx, {display: 'none'})
    );

    return <div className={css.toString()}>{this.props.children}</div>;
  }
}
