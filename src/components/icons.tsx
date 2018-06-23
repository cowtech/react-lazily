import { em } from 'csx'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { debugClassName } from '../styling/mixins'

interface Icons {
  prefix: string
  tags: { [key: string]: string }
  definitions: string
}

export interface IconProps {
  name: string
  className?: string
  onClick?(): void
}

declare const ICONS: Icons

export const iconClassName = style(debugClassName('icon'), {
  width: em(1),
  height: em(1),
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

export function Icon(props: IconProps): JSX.Element | null {
  const icon = ICONS.tags[props.name]

  if (!icon) {
    console.error(`Missing icon ${props.name}.`)

    return null
  }

  return (
    <svg className={classes(iconClassName, `Icon-${props.name}`, props.className)} onClick={props.onClick}>
      <use xlinkHref={`#${icon.toString()}`} />
    </svg>
  )
}

export function IconsDefinitions(): JSX.Element {
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
}
