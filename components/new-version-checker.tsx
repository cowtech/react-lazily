import * as React from 'react';

import {percent, rem} from 'csx';
import {style} from 'typestyle';

import {colorWhite, colorGreen900, colorAmber200, colorAmber500} from '../styling/colors';
import {debugName} from '../styling/mixins';

export interface NewVersionCheckerProps{
  currentVersion: string;
  message?: string;
  action?: string;
}

export interface NewVersionCheckerState{
  newVersionAvailable: boolean;
}

export async function checkVersion(currentVersion: string, element?: HTMLDivElement): Promise<boolean>{
  try{
    // No new workers or SW available, use the manifest
    const manifest: {version: string} = await (await fetch('/manifest.json', {cache: 'no-store', headers: [['Cache-Control', 'no-cache']]})).json();
    const newVersionAvailable: boolean = currentVersion !== manifest.version;

    if(element){
      if(newVersionAvailable)
        element.removeAttribute('data-hidden');
      else
        element.remove();
    }

    return currentVersion !== manifest.version;
  }catch(e){
    // No error checking required. Just assume there is no version
    return false;
  }
}

export function updateVersion(ev: React.MouseEvent<HTMLElement>): void{
  ev.preventDefault();
  location.reload(true);
}

export const newVersionCheckerclassName: string = style(
  debugName('new-version-checker'),
  {
    width: percent(100),
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorGreen900,
    color: colorWhite,
    padding: rem(1),
    textAlign: 'center',
    $nest: {
      '&[data-hidden=true]': {display: 'none'},
      '& a': {
        color: colorAmber500,
        fontWeight: 'bold',
        $nest: {
          '&:hover, &:focus, &:active': {color: colorAmber200}
        }
      }
    }
  }
);

export class NewVersionChecker extends React.Component<NewVersionCheckerProps, NewVersionCheckerState>{
  state = {newVersionAvailable: false};

  render(): JSX.Element{
    if(typeof window !== 'undefined' && !this.state.newVersionAvailable) // The check on window is for SSR
      return null;

    const message: string = this.props.message || 'There is a shiny new version.';
    const action: string = this.props.action || 'Update now!';

    return (
      <div
        id="newVersionChecker" className={newVersionCheckerclassName}
        data-current-version={this.props.currentVersion} data-hidden={typeof window === 'undefined' || !this.state.newVersionAvailable}
      >
        <span>{message}&nbsp;</span>
        <a href="#" onClick={this.handleClick.bind(this)}>{action}</a>
      </div>
    );
  }

  async componentDidMount(): Promise<void>{
    const newVersionAvailable: boolean = await checkVersion(this.props.currentVersion);
    this.setState(() => ({newVersionAvailable}));
  }

  async handleClick(ev: React.MouseEvent<HTMLElement>): Promise<void>{
    ev.preventDefault();
    location.reload(true);
  }
}

export const NewVersionCheckerSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${checkVersion}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);

    checkVersion(element.getAttribute('data-current-version'), element);
  });
`;
