import { TKeyFrame } from 'fela'
import { useFela } from 'react-fela'
import { colorBlack } from '../styling/colors'
import { Style } from '../styling/environment'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const spinnerStyle: Style = {
  margin: 'auto'
}

export const spinnerCircleBaseStyle: Style = {
  fill: 'transparent',
  strokeLinecap: 'round',
  transformOrigin: 'center'
}

/* Adapted from here: https://tech.scrunch.com/blog/creating-an-animated-svg-spinner/ */
function animation({ size }: { size: number }): Style {
  return {
    '0%': { strokeDashoffset: size * 0.66, transform: 'rotate(0deg)' },
    '50%': { strokeDashoffset: size * 3.14, transform: 'rotate(720deg)' },
    '100%': { strokeDashoffset: size * 0.66, transform: 'rotate(1080deg)' }
  }
}

function spinnerImageStyle({ remSize }: { remSize: string }): Style {
  return { width: remSize, height: remSize }
}

function spinnerCircleStyle({
  animation,
  size,
  remSize,
  stroke,
  color
}: {
  animation: string
  size: number
  remSize: string
  stroke: number
  color?: string
}): Style {
  return {
    width: remSize,
    height: remSize,
    stroke: color ?? colorBlack,
    strokeWidth: stroke,
    strokeDasharray: size * 3.14,
    animation: `${animation} 2s linear infinite`
  }
}
// #endregion style

export interface SpinnerProps {
  size?: number
  stroke?: number
  color?: string
  text?: string
  additionalStyle?: Style
}

export const Spinner = createMemoizedComponent('Spinner', function (props: SpinnerProps): JSX.Element {
  const { css, renderer } = useFela()

  const size = props.size ?? 66
  const stroke = props.stroke ?? 6
  const remSize = `${size / 10}rem`
  const animationName = renderer.renderKeyframe(animation as TKeyFrame<{ size: number }>, { size })

  return (
    <main className={css(spinnerStyle, props.additionalStyle ?? {})}>
      <svg viewBox={`0 0 ${size} ${size}`} className={css(spinnerImageStyle({ remSize }))}>
        <circle
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={(size - stroke) / 2}
          className={css(
            spinnerCircleBaseStyle,
            spinnerCircleStyle({ animation: animationName, size, remSize, stroke, color: props.color })
          )}
        />
      </svg>
      {props.text && <h3>{props.text}</h3>}
    </main>
  )
})
