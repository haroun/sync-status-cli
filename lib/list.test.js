import test from 'tape'
import list from './list.js'

test('list files, when using flat tree', async assert => {
  const message = 'should list 10 files'

  const actual = await list('./fixtures/source')
  const expected = [
    {path: 'fixtures/source', name: '00.txt'},
    {path: 'fixtures/source', name: '01.txt'},
    {path: 'fixtures/source', name: '02.txt'},
    {path: 'fixtures/source', name: '03.txt'},
    {path: 'fixtures/source', name: '04.txt'},
    {path: 'fixtures/source', name: '05.txt'},
    {path: 'fixtures/source', name: '06.txt'},
    {path: 'fixtures/source', name: '07.txt'},
    {path: 'fixtures/source', name: '08.txt'},
    {path: 'fixtures/source', name: '09.txt'},
  ]

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('list files, when using tree with branches', async assert => {
  const message = 'should list 10 files'

  const actual = await list('./fixtures/target')
  const expected = [
    {path: 'fixtures/target', name: '00.txt'},
    {path: 'fixtures/target', name: '07.txt'},
    {path: 'fixtures/target', name: '08.txt'},
    {path: 'fixtures/target', name: '09.txt'},
    {path: 'fixtures/target/a', name: '01.txt'},
    {path: 'fixtures/target/a/a', name: '02.txt'},
    {path: 'fixtures/target/b', name: '03.txt'},
    {path: 'fixtures/target/b/b', name: '04.txt'},
    {path: 'fixtures/target/c', name: '05.txt'},
    {path: 'fixtures/target/c/c', name: '06.txt'},
  ]

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('list files, when using invalid path', async assert => {
  const message = 'should return an error'

  try {
    await list('./fixtures/invalid')

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/invalid" (ENOENT)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})

test('list files, when using file as path', async assert => {
  const message = 'should return an error'

  try {
    await list('./fixtures/file.txt')

    assert.fail(message)
  } catch (error) {
    const actual = error
    const expected = new TypeError('invalid path provided "./fixtures/file.txt"; given file, expected directory (ENOTDIR)')

    assert.deepEqual(actual, expected, message)
  }

  assert.end()
})
