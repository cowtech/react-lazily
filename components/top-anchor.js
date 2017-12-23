"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const glamor_1 = require("@cowtech/glamor");
const breakpoints_1 = require("../styling/breakpoints");
const colors_1 = require("../styling/colors");
const icons_1 = require("./icons");
// TODO@PI: SSR support
class TopAnchor extends React.Component {
    constructor() {
        super(...arguments);
        this.css = glamor_1.css({
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
            backgroundColor: this.props.backgroundColor || colors_1.colorBlueGrey600,
            color: this.props.foregroundColor || colors_1.colorWhite,
            borderRadius: '0.5rem',
            opacity: 0.5,
            transition: 'opacity 0.2s ease',
            '&[data-hidden=true]': { opacity: 0 },
            ':hover': { opacity: 1 },
            '& svg, & .fa': { fontSize: '3.5em' }
        }, glamor_1.media(breakpoints_1.breakpointMaxWidth6xx, { width: '3em', height: '3em' }), glamor_1.media(breakpoints_1.breakpointMaxWidth45x, { width: '2em', height: '2em' }), glamor_1.media(breakpoints_1.breakpointMaxHeight6xx, { width: '2em', height: '2em' }));
    }
    static animationProgress(startTime, duration = 350) {
        return Math.min((new Date().getTime() - startTime) / duration, 1);
    }
    // This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
    static ease(x) {
        return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1; // tslint:disable-line no-magic-numbers
    }
    render() {
        return (React.createElement("a", { id: "topAnchor", ref: (el) => this.element = el, className: this.css.toString(), onClick: this.handleScrollToTop.bind(this), href: "#top", title: "Top" },
            React.createElement(icons_1.Icon, { name: "arrow-up" })));
    }
    componentDidMount() {
        this.scrollHandler = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll.bind(this), false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
    shouldComponentUpdate() {
        return false;
    }
    handleScroll() {
        if (!this.element)
            return;
        this.element.setAttribute('data-hidden', (window.pageYOffset === 0).toString());
    }
    handleScrollToTop(ev) {
        ev.preventDefault();
        const startTime = new Date().getTime();
        const base = document.body.scrollTop;
        // Step function for the the animation
        const animate = function () {
            // Compute the progress
            const progress = TopAnchor.animationProgress(startTime);
            // Perform scrolling
            const delta = base * TopAnchor.ease(progress);
            document.body.scrollTop = Math.max(base - delta, 0);
            // Next step or fail stop
            if (progress < 1)
                requestAnimationFrame(animate);
            else
                document.body.scrollTop = 0;
        };
        animate();
    }
}
exports.TopAnchor = TopAnchor;
