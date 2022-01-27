#!/usr/bin/env node

// TODO@PI: Replace with modern-normalize - See cards
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import prettier from 'prettier'
import undici from 'undici'

const downloadUrl = 'https://cdn.jsdelivr.net/npm/modern-normalize/modern-normalize.min.css'
const fileToPatch = 'src/styling/reset.ts'

async function download(url: string): Promise<string> {
  const { body } = await undici.request(url)

  let buffer = Buffer.alloc(0)
  for await (const chunk of body) {
    buffer = Buffer.concat([buffer, chunk])
  }

  return buffer.toString('utf-8')
}

async function main(): Promise<void> {
  console.log('Downloading modern-normalize ...')
  let normalize = (await download(downloadUrl)).replace(/\n+/g, '').replace(/'/g, '"')
  normalize = normalize.replace(/\/\*# sourceMappingURL=.+ \*\//, '')

  console.log(`Patching file ${fileToPatch} ...`)
  const absoluteFileToPatch = resolve(process.cwd(), fileToPatch)
  const lines = (await readFile(absoluteFileToPatch, 'utf8')).split('\n')

  const line = lines.findIndex((l: string) => l.startsWith('export const normalizeCss'))!
  console.log(`  Patching line ${line + 1} ...`)
  lines.splice(line, 2, `export const normalizeCss = '${normalize}'`)

  console.log('Writing updated file ...')
  const prettierConfig = await prettier.resolveConfig(absoluteFileToPatch)
  await writeFile(
    absoluteFileToPatch,
    prettier.format(lines.join('\n'), { ...prettierConfig, parser: 'babel' }),
    'utf8'
  )

  console.log('Operation completed.')
}

main().catch((e: Error) => {
  console.error(e)
  process.exit(1)
})
