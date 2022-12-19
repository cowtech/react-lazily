import { cleanCSSClasses } from '../utils/string.js'

export interface SpinnerProps {
  size?: number
  stroke?: number
  color?: string
  text?: string
  additionalStyle?: string
}

export function Spinner({ size, stroke, color, text, additionalStyle }: SpinnerProps): JSX.Element {
  if (!size) {
    size = 66
  }

  if (!stroke) {
    stroke = 6
  }
  const rem = `${(size / 10).toString().replace('.', '_')}rem`
  const dash = Math.floor(size * 3.14) // Floor here as uno does not easily recognize floats

  const circleStyle = cleanCSSClasses(`
    fill-transparent stroke-cap-round origin-center 
    w-${rem} h-${rem} stroke-${stroke} stroke-${color ?? 'black'} stroke-dash-${dash}
    animate-rl-spinner
  `)

  return (
    <main className={`m-auto ${additionalStyle ?? ''}`.trim()}>
      <svg viewBox={`0 0 ${size} ${size}`} className={`w-${rem} h-${rem}`}>
        <circle
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={(size - stroke) / 2}
          className={circleStyle}
        />
      </svg>
      {text && <h3>{text}</h3>}
    </main>
  )
}
