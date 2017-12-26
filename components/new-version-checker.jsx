import * as React from 'react';
import { style } from 'typestyle';
import { colorWhite, colorGreen900, colorAmber200, colorAmber500 } from '../styling/colors';
export async function checkVersion(currentVersion, element) {
    try {
        // No new workers or SW available, use the manifest
        const manifest = await (await fetch('/manifest.json', { cache: 'no-store', headers: [['Cache-Control', 'no-cache']] })).json();
        const newVersionAvailable = currentVersion !== manifest.version;
        if (element) {
            if (newVersionAvailable)
                element.removeAttribute('data-hidden');
            else
                element.remove();
        }
        return currentVersion !== manifest.version;
    }
    catch (e) {
        // No error checking required. Just assume there is no version
        return false;
    }
}
export function updateVersion(ev) {
    ev.preventDefault();
    location.reload(true);
}
export const newVersionCheckerclassName = style({
    $debugName: 'new-version-checker',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: colorGreen900,
    color: colorWhite,
    padding: '1rem',
    textAlign: 'center',
    $nest: {
        '&[data-hidden=true]': { display: 'none' },
        '& a': {
            color: colorAmber500,
            fontWeight: 'bold',
            $nest: {
                '&:hover, &:focus, &:active': { color: colorAmber200 }
            }
        }
    }
});
export class NewVersionChecker extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { newVersionAvailable: false };
    }
    render() {
        if (typeof window !== 'undefined' && !this.state.newVersionAvailable)
            return null;
        const message = this.props.message || 'There is a shiny new version.';
        const action = this.props.action || 'Update now!';
        return (<div id="newVersionChecker" className={newVersionCheckerclassName} data-current-version={this.props.currentVersion} data-hidden={typeof window === 'undefined' || !this.state.newVersionAvailable}>
        <span>{message}&nbsp;</span>
        <a href="#" onClick={this.handleClick.bind(this)}>{action}</a>
      </div>);
    }
    async componentDidMount() {
        const newVersionAvailable = await checkVersion(this.props.currentVersion);
        this.setState(() => ({ newVersionAvailable }));
    }
    async handleClick(ev) {
        ev.preventDefault();
        location.reload(true);
    }
}
export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${updateVersion}

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);

    (${checkVersion})(element.getAttribute('data-current-version'), element);
  });
`;
