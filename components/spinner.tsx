import * as React from 'react';

import {style, keyframes} from 'typestyle';

import {colorBlack} from '../styling/colors';

export interface SpinnerProps{
  size?: number;
  stroke?: number;
  color?: string;
  text?: string;
}

export function Spinner(props: SpinnerProps): JSX.Element{
  // tslint:disable no-magic-numbers
  const size: number = props.size || 66;
  const stroke: number = props.stroke || 6;

  /* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
  const animation: string = keyframes({
    '0%': {strokeDashoffset: size * 0.66, transform: 'rotate(0deg)'},
    '50%': {strokeDashoffset: size * 3.14, transform: 'rotate(720deg)'},
    '100%': {strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)'}
  });

  const className: string = style({
    $debugName: 'spinner',
    alignSelf: 'center',
    justifySelf: 'center',
    $nest: {
      '& svg': {
        width: `${size / 10}rem`,
        height: `${size / 10}rem`
      },
      '& circle': {
        width: `${size / 10}rem`,
        height: `${size / 10}rem`,
        fill: 'transparent',
        stroke: props.color || colorBlack,
        strokeWidth: stroke,
        strokeLinecap: 'round',
        strokeDasharray: [size * 3.14],
        animation: `${animation} 2s linear infinite`,
        transformOrigin: 'center'
      }
    }
  });
  // tslint:ensable no-magic-numbers

  return (
    <main className={className}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle fill="none" strokeWidth="6" strokeLinecap="round" cx={size / 2} cy={size / 2} r={(size - stroke) / 2}/>
      </svg>
      {props.text && <h3 className="Spinner__title">{props.text}</h3>}
    </main>
  );
}
