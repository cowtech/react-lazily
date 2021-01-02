#!/usr/bin/env node

const {
  promises: { readFile, writeFile }
} = require('fs')
const got = require('got')
const { resolve } = require('path')
const { format, resolveConfig } = require('prettier')

const versionUrl = 'https://api.cdnjs.com/libraries/normalize'
const downloadUrl = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/{version}/normalize.min.css'
const fileToPatch = 'src/styling/reset.ts'

async function main() {
  console.log('Determine normalize.css version to download ...')
  const apiVersion = await got(versionUrl, { responseType: 'json' })
  const version = apiVersion.body.version

  console.log(`Downloading normalize.css ${version} ...`)
  let normalize = (await got(downloadUrl.replace('{version}', version))).body.replace(/\n+/g, '')
  normalize = normalize.replace(/\/\*# sourceMappingURL=.+ \*\//, '')

  console.log(`Patching file ${fileToPatch} ...`)
  const absoluteFileToPatch = resolve(process.cwd(), fileToPatch)
  const lines = (await readFile(absoluteFileToPatch, 'utf8')).split('\n')

  const line = lines.findIndex(l => l.startsWith('export const normalizeCss'))
  console.log(`  Patching line ${line + 1} ...`)
  lines.splice(line, 2, `export const normalizeCss = '${normalize}'`)

  console.log(`Writing updated file ...`)
  const prettierConfig = await resolveConfig(absoluteFileToPatch)
  await writeFile(absoluteFileToPatch, format(lines.join('\n'), { ...prettierConfig, parser: 'babel' }), 'utf8')

  console.log('Operation completed.')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
