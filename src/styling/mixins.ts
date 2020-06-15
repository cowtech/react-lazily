import { NestedCSSProperties } from 'typestyle/lib/types'
import { colorGrey300, colorGrey500, colorWhite } from './colors'
import { env } from './environment'

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
