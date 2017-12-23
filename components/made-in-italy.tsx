import * as React from 'react';

import {css as glamor, StyleAttribute} from '@cowtech/glamor';

import {Ribbon, RibbonProps} from './ribbon';

export class MadeInItaly extends React.PureComponent<RibbonProps>{
  render(): JSX.Element{
    return <Ribbon {...this.props}><a href="http://www.italia.it" target="_blank" rel="noopener noreferrer">Made by a proud Italian!</a></Ribbon>;
  }
  // background: 'linear-gradient(90deg, #009246, #009246 30%, #f1f2f1 30%, #f1f2f1 70%, #ce2b37 70%)',
  // padding: '0 2%',
  // '& a': {
  //   display: 'inline-block',
  //   textAlign: 'center',
  //   width: '60%',
  //   fontWeight: 'bold',
  //   fontSize: '0.85em',
  //   lineHeight: 1,
  //   color: colorBlack,
  //   textShadow: `0 0 0.5rem ${colorWhite}`,
  //   padding: '0.5em 0'
  // }
}
