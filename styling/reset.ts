import {insertGlobal as global} from '@cowtech/glamor';
import {systemFontsStack, fontLato} from './fonts';

import '@cowtech/glamor/reset';

global('html', {fontSize: '10px'});

global('*, *:hover, *:focus, *:active', {
  boxSizing: 'border-box',
  outline: 'none'
});

global('body, a, p, strong, em, li, dd, dt, button, input, select, textarea', {
  fontFamily: `${fontLato}, ${systemFontsStack}`,
  lineHeight: 1.4
});

global('h1, h2, h3, h4, h5, h6', {
  fontFamily: `${fontLato}, ${systemFontsStack}`,
  fontWeight: 'normal',
  lineHeight: 1.4,
  margin: 0
});

global('h1', {fontSize: '3.5em'});
global('h2', {fontSize: '2.5em'});
global('h3', {fontSize: '2em'});
global('h4', {fontSize: '1.5em'});
global('h5, h6', {fontSize: '1em'});

global('a', {
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  willChange: 'color'
});

global('strong', {fontWeight: 'bold'});

global('ul, ol', {paddingLeft: '1.7rem'});
global('ul.unstyled, ol.unstyled', {
  listStyle: 'none',
  margin: 0,
  paddingLeft: 0
});

global('dl', {margin: 0});
global('dt', {fontWeight: 'bold'});
global('dt:nth-child(n + 1)', {marginTop: '1rem'});
global('dl', {margin: '0'});
