import { type CSSValue, type Rule, type UserConfig } from '@unocss/core'
import { type Theme as UnoTheme } from '@unocss/preset-mini'
import { h, handler } from '@unocss/preset-mini/utils'
import { colorGrey500, colorWhite } from './colors.js'

export type UnoRuleDefinition = [
  string | RegExp,
  Record<string, string> | ((v: string[]) => Record<string, string> | CSSValue)
]

export function numericRule(property: string, value: string, unit: string = '', ratio: number = 1): CSSValue {
  const parsed = Number.parseFloat(value.replace('_', '.'))

  return { [property]: `${parsed * ratio}${unit}` }
}

export function transformCSSValue(value: string): string | undefined {
  return value.startsWith('$') ? handler.cssvar(value) : handler.bracket(value)
}

export function generateSpacing(customUnit: string, ratio: number, unit: string): Rule[] {
  const spacings: Rule[] = []
  const sides: Record<string, string[]> = {
    t: ['top'],
    b: ['bottom'],
    l: ['left'],
    r: ['right'],
    x: ['left', 'right'],
    y: ['top', 'bottom']
  }
  const modifiers: [string, number][] = [
    ['', 1],
    ['-', -1]
  ]

  for (const [short, long] of [
    ['p', 'padding'],
    ['m', 'margin']
  ]) {
    for (const [prefix, modifier] of modifiers) {
      spacings.push(
        [
          new RegExp(`^${prefix}${short}-(\\d+(?:_\\d+)?)${customUnit}$`),
          ([, d]) => numericRule(long, d, unit, ratio * modifier)
        ],
        [
          new RegExp(`^${prefix}${short}([tblrxy])-(\\d+(?:_\\d+)?)${customUnit}$`),
          ([, dir, value]) => {
            const values: CSSValue = {}

            for (const side of sides[dir]) {
              Object.assign(values, numericRule(`${long}-${side}`, value, unit, ratio * modifier))
            }

            return values
          }
        ]
      )
    }
  }

  return spacings
}

export function generateGaps(customUnit: string, ratio: number, unit: string): Rule[] {
  return [
    [
      new RegExp(`^gap-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, value]) => ({
        ...numericRule('grid-gap', value, unit, ratio),
        ...numericRule('gap', value, unit, ratio)
      })
    ],
    [
      new RegExp(`^gap-x-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, value]) => ({
        ...numericRule('grid-column-gap', value, unit, ratio),
        ...numericRule('column-gap', value, unit, ratio)
      })
    ],
    [
      new RegExp(`^gap-y-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, value]) => ({
        ...numericRule('grid-row-gap', value, unit, ratio),
        ...numericRule('row-gap', value, unit, ratio)
      })
    ]
  ]
}

export function generateBorders(customUnit: string, ratio: number, unit: string): Rule[] {
  const borders: Rule[] = [
    [new RegExp(`^border-(\\d+(?:_\\d+)?)${customUnit}$`), ([, d]) => numericRule('border-width', d, unit, ratio)]
  ]

  for (const [short, long] of [
    ['t', 'top'],
    ['b', 'bottom'],
    ['l', 'left'],
    ['r', 'right']
  ]) {
    borders.push([
      new RegExp(`^border-${short}-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, d]) => numericRule(`border-${long}-width`, d, unit, ratio)
    ])
  }

  return borders
}

export function generateRadiuses(customUnit: string, ratio: number, unit: string): Rule[] {
  const radiuses: Rule[] = [
    [new RegExp(`^rounded-(\\d+(?:_\\d+)?)${customUnit}$`), ([, d]) => numericRule('border-radius', d, unit, ratio)]
  ]

  for (const [short, long] of [
    ['t', ['top-left', 'top-right']],
    ['b', ['bottom-left', 'bottom-right']],
    ['l', ['top-left', 'bottom-left']],
    ['r', ['top-right', 'bottom-right']],
    ['tl', ['top-left']],
    ['tr', ['top-right']],
    ['bl', ['bottom-left']],
    ['br', ['bottom-right']]
  ]) {
    radiuses.push([
      new RegExp(`^rounded-${short}-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, d]) => {
        const r: CSSValue = {}

        for (const l of long) {
          Object.assign(r, numericRule(`border-${l}-radius`, d, unit, ratio))
        }

        return r
      }
    ])
  }

  return radiuses
}

export function generatePositions(customUnit: string, ratio: number, unit: string): Rule[] {
  const positions: Rule[] = []
  for (const position of ['top', 'bottom', 'left', 'right']) {
    positions.push(
      [
        new RegExp(`^${position}-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, value]) => numericRule(position, value, unit, ratio)
      ],
      [
        new RegExp(`^-${position}-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, value]) => numericRule(position, value, unit, -ratio)
      ]
    )
  }

  return positions
}

export function generateBackgroundPositions(customUnit: string, ratio: number, unit: string): Rule[] {
  const translations: Rule[] = []

  const modifiers: [string, number][] = [
    ['', 1],
    ['-', -1]
  ]

  for (const [prefix, modifier] of modifiers) {
    translations.push(
      [
        new RegExp(`^${prefix}bg-position-x-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, d]) => numericRule('background-position-x', d, unit, ratio * modifier)
      ],
      [
        new RegExp(`^${prefix}bg-position-y-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, d]) => numericRule('background-position-y', d, unit, ratio * modifier)
      ]
    )
  }

  return translations
}

export function generateDimensions(
  short: string,
  long: string,
  customUnit: string,
  ratio: number,
  unit: string
): Rule[] {
  const dimensions: Rule[] = []

  for (const prefix of ['', 'min-', 'max-']) {
    dimensions.push([
      new RegExp(`^${prefix}${short}-(\\d+(?:_\\d+)?)${customUnit}$`),
      ([, value]) => numericRule(`${prefix}${long}`, value, unit, ratio)
    ])
  }

  return dimensions
}

export function generateTranslations(customUnit: string, ratio: number, unit: string): Rule[] {
  const translations: Rule[] = []

  const modifiers: [string, number][] = [
    ['', 1],
    ['-', -1]
  ]

  for (const [prefix, modifier] of modifiers) {
    translations.push(
      [
        new RegExp(`^${prefix}translate-x-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, d]) => numericRule('--un-translate-x', d, unit, ratio * modifier)
      ],
      [
        new RegExp(`^${prefix}translate-y-(\\d+(?:_\\d+)?)${customUnit}$`),
        ([, d]) => numericRule('--un-translate-y', d, unit, ratio * modifier)
      ]
    )
  }

  return translations
}

export function generateCustomUnits(customUnits: [string, number, string][]): Rule[] {
  const rules: Rule[] = []

  for (const [customUnit, ratio, unit] of customUnits) {
    rules.push(
      ...generateSpacing(customUnit, ratio, unit),
      ...generatePositions(customUnit, ratio, unit),
      ...generateBackgroundPositions(customUnit, ratio, unit),
      ...generateGaps(customUnit, ratio, unit),
      ...generateBorders(customUnit, ratio, unit),
      ...generateRadiuses(customUnit, ratio, unit),
      ...generateDimensions('w', 'width', customUnit, ratio, unit),
      ...generateDimensions('h', 'height', customUnit, ratio, unit),
      ...generateTranslations(customUnit, ratio, unit)
    )
  }

  return rules
}

export function defineUnoConfig<Theme extends object = UnoTheme>(config: UserConfig<Theme>): UserConfig<Theme> {
  return config
}

export const units: [string, number, string][] = [
  ['ch', 1, 'ch'],
  ['em', 1, 'em'],
  ['rem', 1, 'rem'],
  ['p', 1, '%'],
  ['px', 1, 'px'],
  ['vw', 1, 'vw'],
  ['vh', 1, 'vh']
]

export const rules: Rule<UnoTheme>[] = [
  [/^flex-(\d+)$/, ([, value]: string[]) => ({ flex: `${value} ${value} 0%` })],
  ['flex-initial', { flex: 'initial' }], // This rule purposely overrides preset-mini one
  [/^flex-direction-(.+)$/, ([, value]: string[]) => ({ 'flex-direction': transformCSSValue(value) })],
  [/^stroke-width-(\d+(?:_\d+)?)$/, ([, value]: string[]) => numericRule('stroke-width', value)],
  [/^line-height-(\d+(?:_\d+)?)$/, ([, value]: string[]) => numericRule('line-height', value, 'em')],
  [/^font-size-(\d+(?:_\d+)?)em$/, ([, value]: string[]) => numericRule('font-size', value, 'em')],
  [/^font-size-(\d+(?:_\d+)?)pt$/, ([, value]: string[]) => numericRule('font-size', value, 'px', 2.7)],
  ['bg-position-x-center', { 'background-position-y': 'center' }],
  ['bg-position-y-center', { 'background-position-y': 'center' }],
  [
    'bg-rl-made-in-italy',
    { background: 'linear-gradient(90deg, #009246, #009246 30%, #f1f2f1 30%, #f1f2f1 70%, #ce2b37 70%)' }
  ],
  ['overflow-ellipsis', { 'text-overflow': 'ellipsis' }],
  // Extracted from https://github.com/unocss/unocss/blob/d27f5af41d48384a9b29491474b3b8f391e2e191/packages/preset-wind/src/rules/animation.ts
  [
    /^animate-(.+)$/,
    ([, name], { theme }) => {
      const kf = theme.animation?.keyframes?.[name]
      if (kf) {
        const duration = theme.animation?.durations?.[name] ?? '1s'
        const timing = theme.animation?.timingFns?.[name] ?? 'linear'
        const count = theme.animation?.counts?.[name] ?? 1
        const props = theme.animation?.properties?.[name]
        return [
          `@keyframes ${name}${kf}`,
          {
            animation: `${name} ${duration} ${timing} ${count}`,
            ...props
          }
        ]
      }
      return { animation: h.bracket.cssvar(name) }
    },
    { autocomplete: 'animate-$animation.keyframes' }
  ]
]

export const shadows: Record<string, string> = {
  'rl-ribbon': `0 0 0.5rem ${colorGrey500}`
}

export const textShadows: Record<string, string> = {
  'rl-made-in-italy': `0 0 5px ${colorWhite}`
}

export const animations: UnoTheme['animation'] = {
  keyframes: {
    'rl-spinner': `
      {
        0% { stroke-dashoffset: 66%; transform: rotate(0deg) }
        50% { stroke-dashoffset: 314%; transform: rotate(720deg) }
        100% { stroke-dashoffset: 66%; transform: rotate(1080deg) }
      }
    `
  },
  durations: {
    'rl-spinner': '2s'
  },
  counts: {
    'rl-spinner': 'infinite'
  }
}
export const animations1: Record<string, string> = {
  'rl-spinner': 'rl-spinner 2s linear infinite'
}

export const safelist: string[] = ['block', 'hidden', 'flex', 'important-block', 'important-hidden', 'important-flex']
