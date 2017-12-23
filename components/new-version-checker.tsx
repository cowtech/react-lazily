import * as React from 'react';

import {css as glamor, media, StyleAttribute} from '@cowtech/glamor';

import {colorWhite, colorGreen900, colorAmber200, colorAmber500} from '../styling/colors';

export interface NewVersionCheckerProps{
  currentVersion: string;
  message?: string;
  action?: string;
}

export interface NewVersionCheckerState{
  newVersionAvailable: boolean;
}

// TODO@PI: SSR support
export class NewVersionChecker extends React.Component<NewVersionCheckerProps, NewVersionCheckerState>{
  private css: StyleAttribute = glamor(
    {
      label: 'new-version-checker',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      backgroundColor: colorGreen900,
      color: colorWhite,
      padding: '1rem',
      textAlign: 'center',
      '& a': [
        {
          color: colorAmber500,
          fontWeight: 'bold',
          '&:hover, &:focus, &:active': {color: colorAmber500}
        },
        media('(hover)', {':hover': {color: colorAmber200}})
      ]
    }
  );

  state = {newVersionAvailable: false};

  render(): JSX.Element{
    if(!this.state.newVersionAvailable)
      return null;

    const message: string = this.props.message || 'There is a shiny new version.';
    const action: string = this.props.action || 'Update now!';

    return (
      <div id="newVersionChecker" className={this.css.toString()}>
        <span>{message}&nbsp;</span>
        <a href="#" onClick={this.handleClick.bind(this)}>{action}</a>
      </div>
    );
  }

  async componentDidMount(): Promise<void>{
    try{
      // No new workers or SW available, use the manifest
      const manifest: {version: string} = await (await fetch('/manifest.json', {cache: 'no-store', headers: [['Cache-Control', 'no-cache']]})).json();

      this.setState(() => ({newVersionAvailable: this.props.currentVersion !== manifest.version}));
    }catch(e){
      // Ignore errors here
    }
  }

  async handleClick(ev: React.MouseEvent<HTMLElement>): Promise<void>{
    ev.preventDefault();
    location.reload(true);
  }
}
