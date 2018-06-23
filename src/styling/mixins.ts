import { percent, px, rem } from 'csx'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { colorGrey300, colorGrey500, colorWhite } from './colors'

declare const process: { env?: { NODE_ENV?: string } }

export const centeredContentsStyle: NestedCSSProperties = {
  width: percent(95),
  maxWidth: rem(120),
  margin: '0 auto'
}

export const cardStyle: NestedCSSProperties = {
  backgroundColor: colorWhite,
  borderRadius: rem(0.25),
  border: `${px(1)} solid ${colorGrey300}`,
  boxShadow: `0 ${rem(0.1)} ${rem(0.2)} ${colorGrey500}`
}

export function debugClassName($debugName: string, force?: boolean): NestedCSSProperties {
  try {
    const env = process.env ? process.env.NODE_ENV : ''
    return (typeof force !== 'undefined' && !force) || env === 'production' ? {} : { $debugName }
  } catch (e) {
    return { $debugName }
  }
}
