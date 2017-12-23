import {css as glamor, StyleAttribute} from '@cowtech/glamor';
import {colorWhite, colorGrey300, colorGrey500} from './colors';

export const centeredContents: StyleAttribute = glamor({
  width: '95%',
  maxWidth: '120rem',
  margin: '0 auto'
});

export const card: StyleAttribute = glamor({
  backgroundColor: colorWhite,
  borderRadius: '0.25rem',
  border: `1px solid ${colorGrey300}`,
  boxShadow: `0 0.1rem 0.2rem ${colorGrey500}`
});
