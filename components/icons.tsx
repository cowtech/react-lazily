import * as React from 'react';

import {em} from 'csx';
import {style, classes} from 'typestyle';

interface Icons{
  prefix: string;
  tags: {[key: string]: string};
  definitions: string;
}

export interface IconProps{
  name: string;
  className?: string;
}

declare const ICONS: Icons;

export const iconClassName: string = style({
  $debugName: 'icon',
  width: em(1),
  height: em(1),
  display: 'inline-block',
  verticalAlign: 'middle',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
});

export const iconsDefinitionsClassName: string = style({
  $debugName: 'icons-definitions',
  width: 0,
  height: 0,
  display: 'none',
  position: 'absolute',
  overflow: 'hidden'
});

export function Icon(props: IconProps): JSX.Element{
  const icon: string = ICONS.tags[props.name];

  if(!icon){
    console.error(`Missing icon ${props.name}.`);

    return null;
  }

  return <svg className={classes(iconClassName, `Icon-${props.name}`, props.className)}><use xlinkHref={`#${icon.toString()}`}/></svg>;
}

export function IconsDefinitions(): JSX.Element{
  return (
    <svg className={iconsDefinitionsClassName} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs dangerouslySetInnerHTML={{__html: ICONS.definitions}}/>
    </svg>
  );
}
