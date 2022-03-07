import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFela } from 'react-fela'
import { colorGrey500, colorGrey800 } from '../styling/colors.js'
import { onServer, Style } from '../styling/environment.js'
import { createMemoizedComponent } from '../utils/dom-utils.js'

// #region style
const ribbonBaseStyle: Style = {
  display: 'var(--rl-ribbon-display)',
  position: 'fixed',
  backfaceVisibility: 'hidden',
  zIndex: 99,
  border: `1px solid ${colorGrey800}`,
  boxShadow: `0 0 0.5rem ${colorGrey500}`,
  padding: '0 2%',
  textAlign: 'center'
}

// 29.28% = 100% - (100% / sqrt(2))
export const ribbonPositionsStyles: Record<string, Style> = {
  'top-left': {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 'auto',
    transform: 'translate(-29.28%, -100%) rotate(-45deg)',
    transformOrigin: 'bottom right'
  },
  'top-right': {
    top: 0,
    left: 'auto',
    bottom: 'auto',
    right: 0,
    transform: 'translate(29.28%, -100%) rotate(45deg)',
    transformOrigin: 'bottom left'
  },
  'bottom-right': {
    top: 'auto',
    left: 'auto',
    bottom: 0,
    right: 0,
    transform: 'translate(29.28%, 100%) rotate(-45deg)',
    transformOrigin: 'top left'
  },
  'bottom-left': {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 'auto',
    transform: 'translate(-29.28%, 100%) rotate(45deg)',
    transformOrigin: 'top right'
  }
}
// #endregion style

export interface RibbonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  additionalStyle?: Style
  children?: ReactNode
}

export const Ribbon = createMemoizedComponent(
  'Ribbon',
  function ({ position, additionalStyle, children }: RibbonProps): JSX.Element {
    const { css } = useFela()
    const positionStyle = ribbonPositionsStyles[position!] ?? ribbonPositionsStyles['top-right']

    const contents = <div className={css(ribbonBaseStyle, positionStyle, additionalStyle ?? {})}>{children}</div>

    return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
  }
)
