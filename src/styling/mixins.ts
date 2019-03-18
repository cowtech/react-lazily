import { percent, px, rem } from 'csx'
import { types } from 'typestyle'
import { colorGrey300, colorGrey500, colorWhite } from './colors'
import { env } from './environment'

export const centeredContentsStyle: types.NestedCSSProperties = {
  width: percent(95),
  maxWidth: rem(120),
  margin: '0 auto'
}

export const cardStyle: types.NestedCSSProperties = {
  backgroundColor: colorWhite,
  borderRadius: rem(0.25),
  border: `${px(1)} solid ${colorGrey300}`,
  boxShadow: `0 ${rem(0.1)} ${rem(0.2)} ${colorGrey500}`
}

export function debugClassName($debugName: string, force?: boolean): types.NestedCSSProperties {
  try {
    return (typeof force !== 'undefined' && !force) || env === 'production' ? {} : { $debugName }
  } catch (e) {
    return { $debugName }
  }
}
