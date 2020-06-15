import React from 'react'
import { classes, keyframes, style } from 'typestyle'
import { colorBlack } from '../styling/colors'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const spinnerClassName = style(debugClassName('spinner'), {
  margin: 'auto'
})

export const spinnerCircleBaseClassName = style(debugClassName('spinner-base-circle'), {
  fill: 'transparent',
  strokeLinecap: 'round',
  transformOrigin: 'center'
})
// #endregion style

export interface SpinnerProps {
  size?: number
  stroke?: number
  color?: string
  text?: string
  className?: string
}

export const Spinner = createMemoizedComponent('Spinner', function (props: SpinnerProps): JSX.Element {
  const size = props.size ?? 66
  const stroke = props.stroke ?? 6
  const remSize = `${size / 10}rem`

  /* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
  const animation = keyframes({
    '0%': { strokeDashoffset: size * 0.66, transform: 'rotate(0deg)' },
    '50%': { strokeDashoffset: size * 3.14, transform: 'rotate(720deg)' },
    '100%': { strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)' }
  })

  const spinnerImageClassName = style(debugClassName('spinner-image'), {
    width: remSize,
    height: remSize
  })

  const spinnerCircleClassName = style(debugClassName('spinner'), {
    width: remSize,
    height: remSize,
    stroke: props.color ?? colorBlack,
    strokeWidth: stroke,
    strokeDasharray: [size * 3.14],
    animation: `${animation} 2s linear infinite`
  })

  return (
    <main className={classes(spinnerClassName, props.className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className={spinnerImageClassName}>
        <circle
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={(size - stroke) / 2}
          className={classes(spinnerCircleBaseClassName, spinnerCircleClassName)}
        />
      </svg>
      {props.text && <h3>{props.text}</h3>}
    </main>
  )
})
