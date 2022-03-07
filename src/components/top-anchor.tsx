import { MouseEvent, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFela } from 'react-fela'
import { colorGrey600, colorWhite } from '../styling/colors.js'
import { onServer, Style } from '../styling/environment.js'
import { linkStyle } from '../styling/mixins.js'
import { createMemoizedComponent } from '../utils/dom-utils.js'
import { Icon } from './icons.js'

// #region style
const topAnchorBaseStyle: Style = {
  display: 'none',
  width: 'var(--rl-top-anchor-size)',
  height: 'var(--rl-top-anchor-size)',
  bottom: '2rem',
  right: '2rem',
  padding: '1rem',
  position: 'fixed',
  zIndex: 101,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  opacity: 0.5,
  transition: 'opacity 0.2s ease'
}

const topAnchorIconStyle: Style = {
  fontSize: '1.5em'
}

function topAnchorStyle(backgroundColor: string | undefined, foregroundColor: string | undefined): Style {
  return {
    backgroundColor: backgroundColor ?? colorGrey600,
    color: foregroundColor ?? colorWhite,
    ...linkStyle({ color: foregroundColor ?? colorWhite }, { opacity: 1, color: foregroundColor ?? colorWhite })
  }
}

// #endregion style

export function animationProgress(startTime: number, duration: number): number {
  if (!duration) {
    duration = 350
  }

  return Math.min((Date.now() - startTime) / duration, 1)
}

// This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
export function ease(x: number): number {
  return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1
}

export function updateTopAnchorStatus(element: HTMLAnchorElement): void {
  if (!element) {
    return
  }

  element.style.display = window.pageYOffset === 0 ? 'none' : 'flex'
}

export function scrollToTop(ev: MouseEvent, duration: number): void {
  ev.preventDefault()

  const startTime = Date.now()
  const base = window.scrollY

  function scroll(y: number): void {
    if (window.scrollTo) {
      window.scrollTo(0, y)
    } else {
      document.body.scrollTop = y
    }
  }

  // Step function for the the animation
  function animate(): void {
    // Compute the progress
    const progress = animationProgress(startTime, duration)

    // Perform scrolling
    const delta = base * ease(progress)
    scroll(Math.max(base - delta, 0))

    // Next step or fail stop
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      scroll(0)
      document.body.scrollTop = 0
    }
  }

  animate()
}

export interface TopAnchorProps {
  duration?: number
  backgroundColor?: string
  foregroundColor?: string
  additionalStyle?: Style
}

export const TopAnchor = createMemoizedComponent(
  'TopAnchor',
  function ({ duration, backgroundColor, foregroundColor, additionalStyle }: TopAnchorProps): JSX.Element {
    const { css } = useFela()

    const element = useRef<HTMLAnchorElement>(null)

    const handleScroll = useCallback(() => {
      updateTopAnchorStatus(element.current!)
    }, [element])

    const handleScrollToTop = useCallback(
      (ev: MouseEvent) => {
        scrollToTop(ev, duration!)
      },
      [duration]
    )

    // Handle events
    useEffect(() => {
      // Register the scroll event
      window.addEventListener('scroll', handleScroll, false)

      // Perform the first update
      handleScroll()

      // Remove event binding upon exist
      return () => {
        window.removeEventListener('scroll', handleScroll, false)
      }
    }, [])

    const contents = (
      <a
        id="topAnchor"
        ref={element}
        className={css(topAnchorBaseStyle, topAnchorStyle(backgroundColor, foregroundColor), additionalStyle ?? {})}
        onClick={handleScrollToTop}
        href="#top"
        title="Top"
      >
        <Icon name="arrow-up" additionalStyle={topAnchorIconStyle} />
      </a>
    )

    return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
  }
)

export const TopAnchorSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${ease};
    ${animationProgress};
    ${updateTopAnchorStatus};
    ${scrollToTop};

    const element = document.getElementById('topAnchor');

    element.addEventListener('click', scrollToTop, false);
    window.addEventListener('scroll', () => updateTopAnchorStatus(element), false);
    updateTopAnchorStatus(element);
  });
`
