import test from 'tape'
import diff from './diff.js'

test('diff files, when using same tree', async assert => {
  const message = 'diff result must be empty'

  const actual = await diff({
    source: './fixtures/source',
    target: './fixtures/source'
  })
  const expected = []

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('diff files, when using distinct tree', async assert => {
  const message = 'diff result must be empty'

  const actual = await diff({
    source: './fixtures/source',
    target: './fixtures/target'
  })
  const expected = []

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('diff files, when using tree with missing files', async assert => {
  const message = 'diff result must be empty'

  const actual = await diff({
    source: './fixtures/source',
    target: './fixtures/target/a'
  })
  const expected = [
    '00.txt',
    '03.txt',
    '04.txt',
    '05.txt',
    '06.txt',
    '07.txt',
    '08.txt',
    '09.txt'
  ]

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('diff files, when using invalid source directory', async assert => {
  const message = 'should return an error'

  try {
    await diff({
      source: './fixtures/invalid',
      target: './fixtures/target'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/invalid" (ENOENT)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})

test('diff files, when using invalid target directory', async assert => {
  const message = 'should return an error'

  try {
    await diff({
      source: './fixtures/source',
      target: './fixtures/invalid'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/invalid" (ENOENT)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})

test('diff files, when using file as source directory', async assert => {
  const message = 'should return an error'

  try {
    await diff({
      source: './fixtures/file.txt',
      target: './fixtures/target'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/file.txt"; given file, expected directory (ENOTDIR)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})

test('diff files, when using file as target directory', async assert => {
  const message = 'should return an error'

  try {
    await diff({
      source: './fixtures/source',
      target: './fixtures/file.txt'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/file.txt"; given file, expected directory (ENOTDIR)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})
