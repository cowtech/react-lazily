import React from 'react'
import { classes, style } from 'typestyle'
import { colorBlack, colorWhite } from '../styling/colors'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'
import { Ribbon, RibbonProps } from './ribbon'

// #region style
export const madeInItalyClassName = style(debugClassName('made-in-italy'), {
  background: 'linear-gradient(90deg, #009246, #009246 30%, #f1f2f1 30%, #f1f2f1 70%, #ce2b37 70%)'
})

export const madeInItalyLinkClassName = style(debugClassName('made-in-italy-link'), {
  display: 'inline-block',
  width: '60%',
  fontWeight: 'bold',
  fontSize: '0.85em',
  lineHeight: 1,
  color: colorBlack,
  textShadow: `0 0 5px ${colorWhite}`,
  padding: '5px'
})
// #endregion style

export const MadeInItaly = createMemoizedComponent(
  'MadeInItaly',
  function ({ position, className }: RibbonProps): JSX.Element {
    return (
      <Ribbon className={classes(madeInItalyClassName, className)} position={position}>
        <a className={madeInItalyLinkClassName} href="http://www.italia.it" target="_blank" rel="noopener noreferrer">
          Made by a proud Italian!
        </a>
      </Ribbon>
    )
  }
)
