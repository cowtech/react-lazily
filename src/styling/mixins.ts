import { colorGrey300, colorGrey500, colorWhite } from './colors'
import { Style } from './environment'

export const centeredContentsStyle: Style = {
  width: '90%',
  maxWidth: '120rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const cardStyle: Style = {
  backgroundColor: colorWhite,
  borderRadius: '3px',
  border: `1px solid ${colorGrey300}`,
  boxShadow: `0 1px 2px ${colorGrey500}`
}

export function linkStyle(
  normalStyle: Style | string,
  hoverStyle: Style | string,
  normalClasses: Array<string> = [':focus', ':active', ':visited'],
  hoverClasses: Array<string> = [':hover']
): Style {
  if (typeof normalStyle === 'string') {
    normalStyle = { color: normalStyle }
  }

  if (typeof hoverStyle === 'string') {
    hoverStyle = { color: hoverStyle }
  }

  return {
    ...normalStyle,
    ...Object.fromEntries(normalClasses.map((klass: string) => [klass, normalStyle])),
    ...Object.fromEntries(hoverClasses.map((klass: string) => [klass, hoverStyle]))
  }
}
