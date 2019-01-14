declare const process: { env?: { NODE_ENV?: string } }

export const env: string = process.env ? process.env.NODE_ENV! : ''
