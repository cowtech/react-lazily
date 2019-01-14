import * as React from 'react'
import { env } from './environment'

export interface ScreenSize {
  id: string
  label?: string
  width: number
  height: number
  ratio: number
}

const appleScreenSizes: Array<ScreenSize> = [
  { id: 'iphone-x', label: 'iPhone X, XS (1125px x 2436px)', width: 375, height: 812, ratio: 3 },
  { id: 'iphone-x-max', label: 'iPhone X, XS Max (1125px x 2436px)', width: 375, height: 812, ratio: 3 },
  { id: 'iphone-xr', label: 'iPhone XR (828px x 1792px)', width: 414, height: 896, ratio: 2 },
  { id: 'iphone-8', label: 'iPhone 8, 7, 6s, 6 (750px x 1334px)', width: 375, height: 667, ratio: 2 },
  {
    id: 'iphone-8-plus',
    label: 'iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px)',
    width: 414,
    height: 736,
    ratio: 3
  },
  { id: 'iphone-5', label: 'iPhone 5 (640px x 1136px)', width: 320, height: 568, ratio: 2 },
  { id: 'ipad-pro-9', label: 'iPad Pro 9.7, iPad Mini, Air (1536px x 2048px)', width: 768, height: 1024, ratio: 2 },
  { id: 'ipad-pro-10', label: 'iPad Pro 10.5" (1668px x 2224px)', width: 834, height: 1112, ratio: 2 },
  { id: 'ipad-pro-12', label: 'iPad Pro 12.9" (2048px x 2732px)', width: 1024, height: 1366, ratio: 2 }
]

export function generateAppleSplashTags(url: string, whitelist: Array<string> = []): Array<JSX.Element> {
  const sizes = whitelist.length
    ? appleScreenSizes.filter((s: ScreenSize) => whitelist.includes(s.id))
    : appleScreenSizes

  return sizes.map(({ label, width, height, ratio }: ScreenSize) => {
    return (
      <link
        key={[width, ratio, height].join('-')}
        rel="apple-touch-startup-image"
        media={`(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio})`}
        href={url.replace('SUFFIX', `${width * ratio}x${height * ratio}`)}
        data-splash-id={env === 'development' ? label : null}
      />
    )
  })
}
