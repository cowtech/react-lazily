declare const process: { env?: { NODE_ENV?: string } }
export const env = process.env ? process.env.NODE_ENV : ''
