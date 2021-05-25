import React from 'react'
import { useFela } from 'react-fela'
import { colorBlack, colorWhite } from '../styling/colors'
import { Style } from '../styling/environment'
import { createMemoizedComponent } from '../utils/dom-utils'
import { Ribbon, RibbonProps } from './ribbon'

// #region style
export const madeInItalyStyles: Style = {
  background: 'linear-gradient(90deg, #009246, #009246 30%, #f1f2f1 30%, #f1f2f1 70%, #ce2b37 70%)'
}

export const madeInItalyLinkStyles: Style = {
  display: 'inline-block',
  width: '60%',
  fontWeight: 'bold',
  fontSize: '0.85em',
  lineHeight: 1,
  color: colorBlack,
  textShadow: `0 0 5px ${colorWhite}`,
  padding: '5px'
}
// #endregion style

export const MadeInItaly = createMemoizedComponent(
  'MadeInItaly',
  function ({ position, additionalStyles }: RibbonProps): JSX.Element {
    const { css } = useFela()

    return (
      <Ribbon additionalStyles={{ ...madeInItalyStyles, ...additionalStyles }} position={position}>
        <a className={css(madeInItalyLinkStyles)} href="http://www.italia.it" target="_blank" rel="noopener noreferrer">
          Made by a proud Italian!
        </a>
      </Ribbon>
    )
  }
)
