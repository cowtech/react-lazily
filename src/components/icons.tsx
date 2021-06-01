import { useFela } from 'react-fela'
import { Style } from '../styling/environment'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const iconStyle: Style = {
  width: '1em',
  height: '1em',
  display: 'inline-block',
  verticalAlign: 'middle',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
}

export const iconsDefinitionsStyle: Style = {
  width: 0,
  height: 0,
  display: 'none',
  position: 'absolute',
  overflow: 'hidden'
}
// #endregion style

interface Icons {
  prefix: string
  tags: { [key: string]: string }
  definitions: string
}

declare const ICONS: Icons

export interface IconProps {
  name: string
  additionalStyle?: Style
  onClick?: () => void
}

export const Icon = createMemoizedComponent(
  'Icon',
  function ({ name, additionalStyle, onClick }: IconProps): JSX.Element | null {
    const { css } = useFela()
    const icon = ICONS.tags[name]

    if (!icon) {
      throw new Error(`Missing icon ${name}.`)
    }

    return (
      <svg className={css(iconStyle, additionalStyle ?? {})} onClick={onClick}>
        <use xlinkHref={`#${icon.toString()}`} />
      </svg>
    )
  }
)

export const IconsDefinitions = createMemoizedComponent('IconsDefinitions', function (): JSX.Element {
  const { css } = useFela()

  return (
    <svg
      className={css(iconsDefinitionsStyle)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs dangerouslySetInnerHTML={{ __html: ICONS.definitions }} />
    </svg>
  )
})
