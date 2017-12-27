import {percent, rem, px} from 'csx';
import {NestedCSSProperties} from 'typestyle/lib/types';

import {colorWhite, colorGrey300, colorGrey500} from './colors';

export const centeredContents: NestedCSSProperties = {
  width: percent(95),
  maxWidth: rem(120),
  margin: '0 auto'
};

export const card: NestedCSSProperties = {
  backgroundColor: colorWhite,
  borderRadius: rem(0.25),
  border: `${px(1)} solid ${colorGrey300}`,
  boxShadow: `0 ${rem(0.1)} ${rem(0.2)} ${colorGrey500}`
};
