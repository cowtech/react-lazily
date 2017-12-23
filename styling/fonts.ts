import {fontFace} from '@cowtech/glamor';

export const systemFontsStack: string = `
  -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Helvetica, Arial, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
`.replace(/\s+/g, '');

export const fontLato: string = fontFace({
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 300,
  src: 'local("Lato Light"), local("Lato-Light"), url(https://fonts.gstatic.com/s/lato/v11/kU6VHbqMAZhaN_nXCmLQsQ.woff) format("woff")',
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
});

export const fontLatoBold: string = fontFace({
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 700,
  src: 'local("Lato Bold"), local("Lato-Bold"), url(https://fonts.gstatic.com/s/lato/v11/I1Pn3gihk5vyP0Yw5GqKsQ.woff) format("woff")',
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
});
