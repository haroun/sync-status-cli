#!/usr/bin/env node

import diff from './lib/diff.js'

const output = ({error, result}) => {
  if (error) {
    process.stderr.write(error.message)
    process.exitCode = 1

    return
  }

  process.stdout.write(result.join('\n'))
  process.exitCode = 0
}

process.on('uncaughtException', error => {
  output({error})
})

const cli = async (source, target) => {
  try {
    const result = await diff({source, target})

    return output({result})
  } catch (error) {
    return output({error})
  }
}

cli(...process.argv.slice(2))
