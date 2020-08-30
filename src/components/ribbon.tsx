import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { classes, style } from 'typestyle'
import { colorGrey500, colorGrey800 } from '../styling/colors'
import { onServer } from '../styling/environment'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
const ribbonBaseClassName = style(debugClassName('ribbon-base'), {
  display: 'var(--rl-ribbon-display)',
  position: 'fixed',
  backfaceVisibility: 'hidden',
  zIndex: 99,
  border: `1px solid ${colorGrey800}`,
  boxShadow: `0 0 0.5rem ${colorGrey500}`,
  padding: '0 2%',
  textAlign: 'center'
})

// 29.28% = 100% - (100% / sqrt(2))
export const ribbonPositionsClassesNames = {
  'top-left': style(debugClassName('ribbon-top-left'), {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 'auto',
    transform: 'translate(-29.28%, -100%) rotate(-45deg)',
    transformOrigin: 'bottom right'
  }),
  'top-right': style(debugClassName('ribbon-top-right'), {
    top: 0,
    left: 'auto',
    bottom: 'auto',
    right: 0,
    transform: 'translate(29.28%, -100%) rotate(45deg)',
    transformOrigin: 'bottom left'
  }),
  'bottom-right': style(debugClassName('ribbon-bottom-right'), {
    top: 'auto',
    left: 'auto',
    bottom: 0,
    right: 0,
    transform: 'translate(29.28%, 100%) rotate(-45deg)',
    transformOrigin: 'top left'
  }),
  'bottom-left': style(debugClassName('ribbon-bottom-left'), {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 'auto',
    transform: 'translate(-29.28%, 100%) rotate(45deg)',
    transformOrigin: 'top right'
  })
}
// #endregion style

export interface RibbonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
  children?: ReactNode
}

export const Ribbon = createMemoizedComponent('Ribbon', function ({
  position,
  className,
  children
}: RibbonProps): JSX.Element {
  const positionClassName = ribbonPositionsClassesNames[position!] ?? ribbonPositionsClassesNames['top-right']

  const contents = <div className={classes(ribbonBaseClassName, positionClassName, className)}>{children}</div>

  return onServer ? contents : createPortal(contents, document.getElementById('rl-modal-root')!)
})
