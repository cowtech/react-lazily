import { em, percent } from 'csx'
import React from 'react'
import { style } from 'typestyle'
import { colorBlack, colorWhite } from '../styling/colors'
import { debugClassName } from '../styling/mixins'
import { Ribbon, RibbonProps } from './ribbon'

export const madeInItalyClassName: string = style(debugClassName('made-in-italy'), {
  background: 'linear-gradient(90deg, #009246, #009246 30%, #f1f2f1 30%, #f1f2f1 70%, #ce2b37 70%)',
  $nest: {
    '& a': {
      display: 'inline-block',
      width: percent(60),
      fontWeight: 'bold',
      fontSize: em(0.85),
      lineHeight: 1,
      color: colorBlack,
      textShadow: `0 0 0.5rem ${colorWhite}`,
      padding: em(0.5)
    }
  }
})

export const MadeInItaly: React.NamedExoticComponent<RibbonProps> = React.memo(function({
  position
}: RibbonProps): JSX.Element {
  return (
    <Ribbon className={madeInItalyClassName} position={position}>
      <a href="http://www.italia.it" target="_blank" rel="noopener noreferrer">
        Made by a proud Italian!
      </a>
    </Ribbon>
  )
})

MadeInItaly.displayName = 'MadeInItaly'
