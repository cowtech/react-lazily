import { NestedCSSProperties } from 'typestyle/lib/types'
import { colorGrey300, colorGrey500, colorWhite } from './colors'
import { env } from './environment'

export type CSSVarName = keyof NestedCSSProperties

export const centeredContentsStyle: NestedCSSProperties = {
  width: '90%',
  maxWidth: '120rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const cardStyle: NestedCSSProperties = {
  backgroundColor: colorWhite,
  borderRadius: '3px',
  border: `1px solid ${colorGrey300}`,
  boxShadow: `0 1px 2px ${colorGrey500}`
}

export function debugClassName($debugName: string, force?: boolean): NestedCSSProperties {
  try {
    return (typeof force !== 'undefined' && !force) || env === 'production' ? {} : { $debugName }
  } catch (e) {
    return { $debugName }
  }
}

export function linkStyle(
  normalStyle: NestedCSSProperties | string,
  hoverStyle: NestedCSSProperties | string,
  normalNestSelector: string = '&:focus, &:active, &:visited',
  hoverNestSelector: string = '&:hover'
): NestedCSSProperties {
  if (typeof normalStyle === 'string') {
    normalStyle = { color: normalStyle }
  }

  if (typeof hoverStyle === 'string') {
    hoverStyle = { color: hoverStyle }
  }

  return {
    ...normalStyle,
    $nest: {
      [normalNestSelector]: normalStyle,
      [hoverNestSelector]: hoverStyle
    }
  }
}
