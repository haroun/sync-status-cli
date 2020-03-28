const { spawn } = require('child_process')
const test = require('tape')

const run = async (args) => {
  const stderr = []
  const stdout = []

  return new Promise((resolve, reject) => {
    const cli = spawn('./cli.js', args)

    cli.stderr.on('data', data => {
      stderr.push(data.toString())
    })
    cli.stdout.on('data', data => {
      stdout.push(data.toString())
    })
    cli.on('close', code => {
      resolve({ stderr, stdout, code })
    })
  })
}

test('cli, when using same tree', async assert => {
  const message = 'diff result must be empty'

  const actual = await run(['./fixtures/source', './fixtures/source'])
  const expected = { stderr: [], stdout: [], code: 0}

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using distinct tree', async assert => {
  const message = 'diff result must be empty'

  const actual = await run(['./fixtures/source', './fixtures/target'])
  const expected = { stderr: [], stdout: [], code: 0}

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using tree with missing files', async assert => {
  const message = 'diff result must be empty'

  const actual = await run(['./fixtures/source', './fixtures/target/a'])
  const expected = {
    stderr: [],
    stdout: [
      [
        '00.txt',
        '03.txt',
        '04.txt',
        '05.txt',
        '06.txt',
        '07.txt',
        '08.txt',
        '09.txt'
      ].join('\n')
    ],
    code: 0
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using invalid source directory', async assert => {
  const message = 'should return an error'

  const actual = await run(['./fixtures/invalid', './fixtures/target'])
  const expected = {
    stderr: ['invalid path provided "./fixtures/invalid" (ENOENT)'],
    stdout: [],
    code: 1
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using invalid target directory', async assert => {
  const message = 'should return an error'

  const actual = await run(['./fixtures/source', './fixtures/invalid'])
  const expected = {
    stderr: ['invalid path provided "./fixtures/invalid" (ENOENT)'],
    stdout: [],
    code: 1
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using file as source directory', async assert => {
  const message = 'should return an error'

  const actual = await run(['./fixtures/file.txt', './fixtures/target'])
  const expected = {
    stderr: ['invalid path provided "./fixtures/file.txt"; given file, expected directory (ENOTDIR)'],
    stdout: [],
    code: 1
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('cli, when using file as target directory', async assert => {
  const message = 'should return an error'

  const actual = await run(['./fixtures/source', './fixtures/file.txt'])
  const expected = {
    stderr: ['invalid path provided "./fixtures/file.txt"; given file, expected directory (ENOTDIR)'],
    stdout: [],
    code: 1
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
