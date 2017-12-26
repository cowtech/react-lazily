import * as React from 'react';
import { style } from 'typestyle';
export const iconClassName = style({
    $debugName: 'icon',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    verticalAlign: 'middle',
    strokeWidth: 0,
    stroke: 'currentColor',
    fill: 'currentColor'
});
export const iconsDefinitionsClassName = style({
    $debugName: 'icons-definitions',
    width: 0,
    height: 0,
    display: 'none',
    position: 'absolute',
    overflow: 'hidden'
});
export function Icon(props) {
    const icon = ICONS.tags[props.name];
    if (!icon) {
        console.error(`Missing icon ${props.name}.`);
        return null;
    }
    return <svg className={`${iconClassName} Icon-${props.name} ${props.className || ''}`}><use xlinkHref={`#${icon.toString()}`}/></svg>;
}
export function IconsDefinitions() {
    return (<svg className={iconsDefinitionsClassName} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs dangerouslySetInnerHTML={{ __html: ICONS.definitions }}/>
    </svg>);
}
