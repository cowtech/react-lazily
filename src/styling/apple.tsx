import { env } from './environment.js'

export interface SplashDictionary {
  [key: string]: string
}

export interface ScreenSize {
  id: string
  devices: string[]
  width: number
  height: number
  ratio: number
}

function splashParams(
  width: number,
  height: number,
  ratio: number,
  url: string | SplashDictionary,
  orientation: 'portrait' | 'landscape'
): string[] {
  const spec = `${width * ratio}x${height * ratio}`
  const isTemplateUrl = typeof url === 'string'

  return [
    [width, height, ratio].join('-'), // Key
    `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: ${orientation})`, // Media query
    isTemplateUrl ? url.replace('SUFFIX', spec) : url[spec] // Href
  ]
}

export const appleScreenSizes: ScreenSize[] = [
  {
    id: 'iphone-12-pro-max',
    devices: ['iPhone 12 Pro Max'],
    width: 428,
    height: 926,
    ratio: 3
  },
  {
    id: 'iphone-12-pro',
    devices: ['iPhone 12 Pro', 'iPhone 12'],
    width: 390,
    height: 844,
    ratio: 3
  },
  {
    id: 'iphone-12-mini',
    devices: ['iPhone 12 Mini'],
    width: 360,
    height: 780,
    ratio: 3
  },
  {
    id: 'iphone-11-pro-max',
    devices: ['iPhone 11 Pro Max', 'iPhone XS Max', 'iPhone X Max'],
    width: 414,
    height: 896,
    ratio: 3
  },
  {
    id: 'iphone-11-pro',
    devices: ['iPhone 11 Pro', 'iPhone XS', 'iPhone X'],
    width: 375,
    height: 812,
    ratio: 3
  },
  {
    id: 'iphone-11',
    devices: ['iPhone 11', 'iPhone 11', 'iPhone XR'],
    width: 414,
    height: 896,
    ratio: 2
  },
  {
    id: 'iphone-8',
    devices: ['iPhone 8', 'iPhone 7', 'iPhone 6s', 'iPhone 6', 'iPhone SE (2nd gen)'],
    width: 375,
    height: 667,
    ratio: 2
  },
  {
    id: 'iphone-8-plus',
    devices: ['iPhone 8 Plus', 'iPhone 7 Plus', 'iPhone 6s Plus', 'iPhone 6 Plus'],
    width: 414,
    height: 736,
    ratio: 3
  },
  {
    id: 'iphone-se-1',
    devices: ['iPhone 5', 'iPhone SE (1st gen)'],
    width: 320,
    height: 568,
    ratio: 2
  },

  {
    id: 'ipad-pro-12',
    devices: ['iPad Pro 12.9"'],
    width: 1024,
    height: 1366,
    ratio: 2
  },
  {
    id: 'ipad-pro-11',
    devices: ['iPad Pro 11"'],
    width: 834,
    height: 1194,
    ratio: 2
  },
  {
    id: 'ipad-air-10',
    devices: ['iPad Air 10.9" (4th gen)'],
    width: 820,
    height: 1180,
    ratio: 2
  },
  {
    id: 'ipad-pro-10',
    devices: ['iPad Pro 10.5"', 'iPad Air (3th gen)'],
    width: 834,
    height: 1112,
    ratio: 2
  },
  {
    id: 'ipad',
    devices: ['iPad 10.2" (7th gen)', 'iPad 10.2" (8th gen)'],
    width: 810,
    height: 1080,
    ratio: 2
  },
  {
    id: 'ipad-older',
    devices: ['iPad (up to 6th gen)', 'iPad Pro 9.7', 'iPad Air (1st gen)', 'iPad Air (2st gen)', 'iPad Mini'],
    width: 768,
    height: 1024,
    ratio: 2
  }
]

export function generateAppleSplashTags(
  url: string | SplashDictionary,
  includeLandscape: boolean = true,
  whitelist: string[] = []
): JSX.Element[] {
  const sizes = whitelist.length
    ? appleScreenSizes.filter((s: ScreenSize) => whitelist.includes(s.id))
    : appleScreenSizes

  const tags: JSX.Element[] = []

  for (const { devices, width, height, ratio } of sizes) {
    const portraitId = env === 'development' ? `${devices.join(', ')} - Portrait` : null
    const [portraitKey, portraitQuery, portraitHref] = splashParams(width, height, ratio, url, 'portrait')

    tags.push(
      <link
        key={portraitKey}
        rel="apple-touch-startup-image"
        media={portraitQuery}
        href={portraitHref}
        data-splash-id={portraitId}
      />
    )

    if (includeLandscape) {
      const landscapeId = env === 'development' ? `${devices.join(', ')} - Landscape` : null
      const [landscapeKey, landscapeQuery, landscapeHref] = splashParams(height, width, ratio, url, 'landscape')

      tags.push(
        <link
          key={landscapeKey}
          rel="apple-touch-startup-image"
          media={landscapeQuery}
          href={landscapeHref}
          data-splash-id={landscapeId}
        />
      )
    }
  }

  return tags
}
