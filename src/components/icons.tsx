import { em } from 'csx'
import React from 'react'
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

export const iconClassName: string = style(debugClassName('icon'), {
  width: em(1),
  height: em(1),
  display: 'inline-block',
  verticalAlign: 'middle',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
})

export const iconsDefinitionsClassName: string = style(debugClassName('icons-definitions'), {
  width: 0,
  height: 0,
  display: 'none',
  position: 'absolute',
  overflow: 'hidden'
})

export const Icon: React.NamedExoticComponent<IconProps> = React.memo(function({
  name,
  className,
  onClick
}: IconProps): JSX.Element | null {
  const icon = ICONS.tags[name]

  if (!icon) {
    console.error(`Missing icon ${name}.`)

    return null
  }

  return (
    <svg className={classes(iconClassName, `Icon-${name}`, className)} onClick={onClick}>
      <use xlinkHref={`#${icon.toString()}`} />
    </svg>
  )
})

export const IconsDefinitions: React.NamedExoticComponent<{}> = React.memo(function(): JSX.Element {
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
