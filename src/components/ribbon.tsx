import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { onServer } from '../environment.js'
import { cleanCSSClasses, sanitizeClassName } from '../utils/string.js'

export interface RibbonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
  skipDefaultClassName?: boolean
  children?: ReactNode
}

const ribbonStyle = cleanCSSClasses(
  'fixed display-$rl-ribbon-display backface-hidden z-99 border-1px border-grey-800 px-2p text-center shadow-rl-ribbon'
)

// 29.28% = 100% - (100% / sqrt(2))
const ribbonPositionsStyles: Record<string, string> = {
  'top-left': cleanCSSClasses('top-0 left-0 origin-bottom-right -translate-x-29_28p -translate-y-full -rotate-45'),
  'top-right': cleanCSSClasses('top-0 right-0 origin-bottom-left translate-x-29_28p -translate-y-full rotate-45'),
  'bottom-right': cleanCSSClasses('bottom-0 right-0 origin-top-left translate-x-29_28p translate-y-full -rotate-45'),
  'bottom-left': cleanCSSClasses('bottom-0 left-0 origin-top-right -translate-x-29_28p translate-y-full rotate-45')
}

const madeInItalyStyle = cleanCSSClasses('w-23rem bg-rl-made-in-italy')
const madeInItalyLinkStyle = cleanCSSClasses(
  'inline-block w-10rem font-bold font-size-0_85em line-height-1 text-black p-5px text-shadow-rl-made-in-italy'
)

export function Ribbon({ position, className, skipDefaultClassName, children }: RibbonProps): JSX.Element {
  const positionStyle = ribbonPositionsStyles[position!] ?? ribbonPositionsStyles['top-right']

  const contents = (
    <div
      className={sanitizeClassName(
        !skipDefaultClassName && ribbonStyle,
        !skipDefaultClassName && positionStyle,
        className
      )}
    >
      {children}
    </div>
  )

  return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
}

export function MadeInItaly({ position, skipDefaultClassName, className }: Omit<RibbonProps, 'children'>): JSX.Element {
  return (
    <Ribbon
      skipDefaultClassName={skipDefaultClassName}
      className={sanitizeClassName(!skipDefaultClassName && madeInItalyStyle, className)}
      position={position}
    >
      <a
        className={sanitizeClassName(!skipDefaultClassName && madeInItalyLinkStyle)}
        href="http://www.italia.it"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made by a proud Italian!
      </a>
    </Ribbon>
  )
}
