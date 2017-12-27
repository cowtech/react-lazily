import * as React from 'react';
import { em, rem } from 'csx';
import { style, media } from 'typestyle';
import { maxWidth45x, maxWidth6xx, maxHeight6xx } from '../styling/breakpoints';
import { colorWhite, colorGrey600 } from '../styling/colors';
import { Icon } from './icons';
export function animationProgress(startTime, duration) {
    if (!duration)
        duration = 350;
    return Math.min((new Date().getTime() - startTime) / duration, 1);
}
// This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
export function ease(x) {
    return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1;
}
export function handleScroll(element) {
    if (!element)
        return;
    element.setAttribute('data-hidden', (window.pageYOffset === 0).toString());
}
export function handleScrollToTop(ev, duration) {
    ev.preventDefault();
    const startTime = new Date().getTime();
    const base = document.body.scrollTop;
    // Step function for the the animation
    const animate = function () {
        // Compute the progress
        const progress = animationProgress(startTime, duration);
        // Perform scrolling
        const delta = base * ease(progress);
        document.body.scrollTop = Math.max(base - delta, 0);
        // Next step or fail stop
        if (progress < 1)
            requestAnimationFrame(animate);
        else
            document.body.scrollTop = 0;
    };
    animate();
}
export class TopAnchor extends React.Component {
    constructor() {
        super(...arguments);
        this.className = style({
            $debugName: 'top-anchor',
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
        }, media({ maxWidth: maxWidth6xx }, { width: em(3), height: em(3) }), media({ maxWidth: maxWidth45x }, { width: em(2), height: em(2) }), media({ maxHeight: maxHeight6xx }, { width: em(2), height: em(2) }));
    }
    render() {
        return (<a id="topAnchor" ref={(el) => this.element = el} className={this.className} onClick={this.handleScrollToTop.bind(this)} href="#top" title="Top">
        <Icon name="arrow-up"/>
      </a>);
    }
    componentDidMount() {
        this.scrollHandler = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll.bind(this), false);
        this.handleScroll();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
    shouldComponentUpdate() {
        return false;
    }
    handleScroll() {
        handleScroll(this.element);
    }
    handleScrollToTop(ev) {
        handleScrollToTop(ev, this.props.duration);
    }
}
export const TopAnchorSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${ease}
    ${animationProgress}
    ${handleScroll}
    ${handleScrollToTop}

    const element = document.getElementById('topAnchor');

    element.addEventListener('click', handleScrollToTop, false);
    window.addEventListener('scroll', function(){ handleScroll(element); }, false);
    handleScroll(element);
  });
`;
