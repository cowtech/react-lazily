import React from 'react'
import { classes, style } from 'typestyle'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const iconClassName = style(debugClassName('icon'), {
  width: '1em',
  height: '1em',
  display: 'inline-block',
  verticalAlign: 'middle',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
})

export const iconsDefinitionsClassName = style(debugClassName('icons-definitions'), {
  width: 0,
  height: 0,
  display: 'none',
  position: 'absolute',
  overflow: 'hidden'
})
// #endregion style

interface Icons {
  prefix: string
  tags: { [key: string]: string }
  definitions: string
}

declare const ICONS: Icons

export interface IconProps {
  name: string
  className?: string
  onClick?(): void
}

export const Icon = createMemoizedComponent('Icon', function ({
  name,
  className,
  onClick
}: IconProps): JSX.Element | null {
  const icon = ICONS.tags[name]

  if (!icon) {
    throw new Error(`Missing icon ${name}.`)
  }

  return (
    <svg className={classes(iconClassName, `Icon-${name}`, className)} onClick={onClick}>
      <use xlinkHref={`#${icon.toString()}`} />
    </svg>
  )
})

export const IconsDefinitions = createMemoizedComponent('IconsDefinitions', function (): JSX.Element {
  return (
    <svg
      className={iconsDefinitionsClassName}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs dangerouslySetInnerHTML={{ __html: ICONS.definitions }} />
    </svg>
  )
})
