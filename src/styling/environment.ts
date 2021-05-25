import { IStyle } from 'fela'

export type Style = IStyle

export const env = process.env.NODE_ENV!

export const onServer = typeof window === 'undefined'
