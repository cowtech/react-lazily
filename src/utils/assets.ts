import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const assetsRoot = fileURLToPath(new URL('../assets', import.meta.url))

export function loadAsset<T = string | Buffer>(path: string, encoding?: BufferEncoding): Promise<T> {
  return readFile(resolve(assetsRoot, path), encoding) as Promise<T>
}
