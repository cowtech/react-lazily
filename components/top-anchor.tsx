import * as React from 'react';
import {css as glamor, media, StyleAttribute} from '@cowtech/glamor';

import {breakpointMaxWidth45x, breakpointMaxWidth6xx, breakpointMaxHeight6xx} from '../styling/breakpoints';
import {colorWhite, colorBlueGrey600} from '../styling/colors';
import {BoundHandler} from '../utils/dom-utils';
import {Icon} from './icons';

export interface TopAnchorProps{
  duration: number;
  backgroundColor: string;
  foregroundColor: string;
}

// TODO@PI: SSR support
export class TopAnchor extends React.Component<TopAnchorProps>{
  static animationProgress(startTime: number, duration: number = 350): number{
    return Math.min((new Date().getTime() - startTime) / duration, 1);
  }

  // This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
  static ease(x: number): number{
    return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1; // tslint:disable-line no-magic-numbers
  }

  private element: HTMLAnchorElement;
  private scrollHandler: BoundHandler;
  private css: StyleAttribute = glamor(
    {
      label: 'top-anchor',
      width: '4em',
      height: '4em',
      bottom: '2rem',
      right: '2rem',
      position: 'fixed',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: this.props.backgroundColor || colorBlueGrey600,
      color: this.props.foregroundColor || colorWhite,
      borderRadius: '0.5rem',
      opacity: 0.5,
      transition: 'opacity 0.2s ease',
      '&[data-hidden=true]': {opacity: 0},
      ':hover': {opacity: 1},
      '& svg, & .fa': {fontSize: '3.5em'}
    },
    media(breakpointMaxWidth6xx, {width: '3em', height: '3em'}),
    media(breakpointMaxWidth45x, {width: '2em', height: '2em'}),
    media(breakpointMaxHeight6xx, {width: '2em', height: '2em'})
  );

  render(): JSX.Element{
    return (
      <a id="topAnchor" ref={(el: HTMLAnchorElement) => this.element = el}
        className={this.css.toString()} onClick={this.handleScrollToTop.bind(this)} href="#top" title="Top">
        <Icon name="arrow-up"/>
      </a>
    );
  }

  componentDidMount(): void{
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll.bind(this), false);
  }

  componentWillUnmount(): void{
    window.removeEventListener('scroll', this.scrollHandler);
  }

  shouldComponentUpdate(): boolean{
    return false;
  }

  handleScroll(): void{
    if(!this.element)
      return;

    this.element.setAttribute('data-hidden', (window.pageYOffset === 0).toString());
  }

  handleScrollToTop(ev: React.MouseEvent<HTMLElement>): void{
    ev.preventDefault();

    const startTime: number = new Date().getTime();
    const base: number = document.body.scrollTop;

    // Step function for the the animation
    const animate = function(): void{
      // Compute the progress
      const progress: number = TopAnchor.animationProgress(startTime);

      // Perform scrolling
      const delta: number = base * TopAnchor.ease(progress);
      document.body.scrollTop = Math.max(base - delta, 0);

      // Next step or fail stop
      if(progress < 1)
        requestAnimationFrame(animate);
      else
        document.body.scrollTop = 0;
    };

    animate();
  }
}
