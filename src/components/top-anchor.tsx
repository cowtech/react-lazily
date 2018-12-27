import { em, rem } from 'csx'
import * as React from 'react'
import { media, style } from 'typestyle'
import { maxHeight6xx, maxWidth45x, maxWidth6xx } from '../styling/breakpoints'
import { colorGrey600, colorWhite } from '../styling/colors'
import { debugClassName } from '../styling/mixins'
import { BoundHandler } from '../utils/dom-utils'
import { Icon } from './icons'

export interface TopAnchorProps {
  duration?: number
  backgroundColor?: string
  foregroundColor?: string
}

export function animationProgress(startTime: number, duration: number): number {
  if (!duration) duration = 350

  return Math.min((Date.now() - startTime) / duration, 1)
}

// This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
export function ease(x: number): number {
  return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1
}

export function updateTopAnchorStatus(element: HTMLAnchorElement): void {
  if (!element) return

  element.setAttribute('data-hidden', (window.pageYOffset === 0).toString())
}

export function scrollToTop(ev: React.MouseEvent, duration: number): void {
  ev.preventDefault()

  const startTime = Date.now()
  const base = document.body.scrollTop

  // Step function for the the animation
  function animate(): void {
    // Compute the progress
    const progress = animationProgress(startTime, duration)

    // Perform scrolling
    const delta = base * ease(progress)
    document.body.scrollTop = Math.max(base - delta, 0)

    // Next step or fail stop
    if (progress < 1) requestAnimationFrame(animate)
    else document.body.scrollTop = 0
  }

  animate()
}

export class TopAnchor extends React.Component<TopAnchorProps> {
  private element: React.RefObject<HTMLAnchorElement>
  private className = style(
    debugClassName('top-anchor'),
    {
      width: em(4),
      height: em(4),
      bottom: rem(2),
      right: rem(2),
      position: 'fixed',
      zIndex: 101,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: this.props.backgroundColor || colorGrey600,
      color: this.props.foregroundColor || colorWhite,
      borderRadius: rem(0.5),
      opacity: 0.5,
      transition: 'opacity 0.2s ease',
      $nest: {
        '&[data-hidden=true]': { display: 'none' },
        '&:hover': { opacity: 1, color: this.props.foregroundColor || colorWhite },
        '&:focus, &:active, &:visited': { color: this.props.foregroundColor || colorWhite },
        '& svg, & .fa': { fontSize: em(2.5) }
      }
    },
    media({ minWidth: maxWidth45x + 1, maxWidth: maxWidth6xx }, { width: em(3), height: em(3) }),
    media({ maxWidth: maxWidth45x }, { width: em(2), height: em(2) }),
    media({ maxHeight: maxHeight6xx }, { width: em(2), height: em(2) })
  )
  private boundHandleScroll: BoundHandler = this.handleScroll.bind(this)
  private boundHandleScrollToTop: BoundHandler = this.handleScrollToTop.bind(this)

  render(): JSX.Element {
    this.element = React.createRef()

    return (
      <a
        id="topAnchor"
        ref={this.element}
        className={this.className}
        onClick={this.boundHandleScrollToTop}
        href="#top"
        title="Top"
      >
        <Icon name="arrow-up" />
      </a>
    )
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.boundHandleScroll, false)
    this.handleScroll()
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.boundHandleScroll)
  }

  shouldComponentUpdate(): boolean {
    return false
  }

  handleScroll(): void {
    updateTopAnchorStatus(this.element.current!)
  }

  handleScrollToTop(ev: React.MouseEvent): void {
    scrollToTop(ev, this.props.duration!)
  }
}

export const TopAnchorSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${ease}
    ${animationProgress}
    ${updateTopAnchorStatus}
    ${scrollToTop}

    const element = document.getElementById('topAnchor')

    element.addEventListener('click', scrollToTop, false)
    window.addEventListener('scroll', function(){ updateTopAnchorStatus(element); }, false)
    updateTopAnchorStatus(element)
  });
`
