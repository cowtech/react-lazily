import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { onServer } from '../environment.js'

export interface RibbonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  additionalStyle?: string
  children?: ReactNode
}

const ribbonBaseStyle =
  'fixed display-$rl-ribbon-display backface-hidden z-99 border-1px border-grey-800 px-2p text-center shadow-rl-ribbon'

// 29.28% = 100% - (100% / sqrt(2))
const ribbonPositionsStyles: Record<string, string> = {
  'top-left': 'top-0 left-0 origin-bottom-right -translate-x-29_28p -translate-y-full -rotate-45',
  'top-right': 'top-0 right-0 origin-bottom-left translate-x-29_28p -translate-y-full rotate-45',
  'bottom-right': 'bottom-0 right-0 origin-top-left translate-x-29_28p translate-y-full -rotate-45',
  'bottom-left': 'bottom-0 left-0 origin-top-right -translate-x-29_28p translate-y-full rotate-45'
}

export function Ribbon({ position, additionalStyle, children }: RibbonProps): JSX.Element {
  const positionStyle = ribbonPositionsStyles[position!] ?? ribbonPositionsStyles['top-right']

  const contents = (
    <div className={[ribbonBaseStyle, positionStyle, additionalStyle].filter(Boolean).join(' ')}>{children}</div>
  )

  return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
}

export function MadeInItaly({ position, additionalStyle }: Omit<RibbonProps, 'children'>): JSX.Element {
  return (
    <Ribbon
      additionalStyle={['w-23rem bg-rl-made-in-italy', additionalStyle].filter(Boolean).join(' ')}
      position={position}
    >
      <a
        className="inline-block w-10rem font-bold font-size-0_85em line-height-1 text-black p-5px text-shadow-rl-made-in-italy"
        href="http://www.italia.it"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made by a proud Italian!
      </a>
    </Ribbon>
  )
}
