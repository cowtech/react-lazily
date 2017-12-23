import * as React from 'react';

import {css as glamor, StyleAttribute} from '@cowtech/glamor';

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

export class Icon extends React.Component<IconProps>{
  private css: StyleAttribute = glamor({
    label: 'icon',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    verticalAlign: 'middle',
    strokeWidth: 0,
    stroke: 'currentColor',
    fill: 'currentColor'
  });

  render(): JSX.Element{
    const icon: string = ICONS.tags[this.props.name];

    if(!icon){
      console.error(`Missing icon ${this.props.name}.`);

      return null;
    }

    return <svg className={`${this.css.toString()} Icon-${this.props.name} ${this.props.className || ''}`}><use xlinkHref={`#${icon.toString()}`}/></svg>;
  }
}

export class IconsDefinitions extends React.Component{
  render(): JSX.Element{
    const css: StyleAttribute = glamor({
      label: 'icons-definitions',
      width: 0,
      height: 0,
      display: 'none',
      position: 'absolute',
      overflow: 'hidden'
    });

    return (
      <svg className={css.toString()} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs dangerouslySetInnerHTML={{__html: ICONS.definitions}}/>
      </svg>
    );
  }

  shouldComponentUpdate(): boolean{
    return false;
  }
}
