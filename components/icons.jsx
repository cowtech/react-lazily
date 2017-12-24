import * as React from 'react';
import { style } from 'typestyle';
export class Icon extends React.Component {
    constructor() {
        super(...arguments);
        this.className = style({
            $debugName: 'icon',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'middle',
            strokeWidth: 0,
            stroke: 'currentColor',
            fill: 'currentColor'
        });
    }
    render() {
        const icon = ICONS.tags[this.props.name];
        if (!icon) {
            console.error(`Missing icon ${this.props.name}.`);
            return null;
        }
        return <svg className={`${this.className} Icon-${this.props.name} ${this.props.className || ''}`}><use xlinkHref={`#${icon.toString()}`}/></svg>;
    }
}
export class IconsDefinitions extends React.Component {
    render() {
        const className = style({
            $debugName: 'icons-definitions',
            width: 0,
            height: 0,
            display: 'none',
            position: 'absolute',
            overflow: 'hidden'
        });
        return (<svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs dangerouslySetInnerHTML={{ __html: ICONS.definitions }}/>
      </svg>);
    }
    shouldComponentUpdate() {
        return false;
    }
}
