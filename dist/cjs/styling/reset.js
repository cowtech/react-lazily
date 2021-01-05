import { cssRaw, cssRule as global, media } from 'typestyle';
import { maxHeight6xx, maxWidth45x, maxWidth7xx } from './breakpoints';
export const normalizeCss = '/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}';
export function resetStyles() {
    cssRaw(normalizeCss);
    global('html', {
        fontSize: '10px',
        // @ts-expect-error
        '--rl-ribbon-display': 'block',
        '--rl-top-anchor-size': '4em'
    }, media({ maxWidth: maxWidth7xx }, {
        // @ts-expect-error
        '--rl-ribbon-display': 'none'
    }), media({ maxWidth: maxWidth45x }, {
        // @ts-expect-error
        '--rl-top-anchor-size': '3em'
    }), media({ maxWidth: maxHeight6xx }, {
        // @ts-expect-error
        '--rl-top-anchor-size': '3em'
    }));
    global('*, *:hover, *:focus, *:active, *:before, *::after', {
        boxSizing: 'border-box',
        outline: 'none'
    });
    global('body, a, p, strong, em, li, dd, dt, button, input, select, textarea, h1, h2, h3, h4, h5, h6', {
        margin: 0,
        lineHeight: 1.4
    });
    global('h1', { fontSize: '3.5em' });
    global('h2', { fontSize: '2.5em' });
    global('h3', { fontSize: '2em' });
    global('h4', { fontSize: '1.5em' });
    global('h5, h6', { fontSize: '1em' });
    global('a', {
        textDecoration: 'none',
        transition: 'color 0.2s ease'
    });
    global('strong', { fontWeight: 'bold' });
    global('ul, ol', { paddingLeft: '1.7rem' });
    global('ul.unstyled, ol.unstyled', {
        listStyle: 'none',
        margin: 0,
        paddingLeft: 0
    });
    global('dl', { margin: 0 });
    global('dt', { fontWeight: 'bold' });
    global('dt:nth-child(n + 1)', { marginTop: '1rem' });
    global('dl', { margin: '0' });
}