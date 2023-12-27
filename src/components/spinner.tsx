import { useContext } from 'react'
import { cleanCSSClasses } from '../utils/string.js'
import { CSSClassesResolverContext, type CSSClassesResolverContextType } from './classes-resolver.js'

export interface SpinnerProps {
  size?: number
  stroke?: number
  color?: string
  text?: string
  className?: string
  skipDefaultClassName?: boolean
}

export function Spinner({ size, stroke, color, text, className, skipDefaultClassName }: SpinnerProps): JSX.Element {
  const [resolveClasses] = useContext<CSSClassesResolverContextType>(CSSClassesResolverContext)

  if (!size) {
    size = 66
  }

  if (!stroke) {
    stroke = 6
  }
  const rem = `${(size / 10).toString().replace('.', '_')}rem`
  const dash = Math.floor(size * 3.14) // Floor here as uno does not easily recognize floats

  const spinnerStyle = cleanCSSClasses('m-auto')

  const circleStyle = cleanCSSClasses(`
    fill-transparent stroke-cap-round origin-center 
    w-${rem} h-${rem} stroke-${stroke} stroke-${color ?? 'black'} stroke-dash-${dash}
    animate-rl-spinner
  `)

  return (
    <main className={resolveClasses(!skipDefaultClassName && spinnerStyle, className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className={`w-${rem} h-${rem}`}>
        <circle
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={(size - stroke) / 2}
          className={resolveClasses(!skipDefaultClassName && circleStyle)}
        />
      </svg>
      {text && <h3>{text}</h3>}
    </main>
  )
}
