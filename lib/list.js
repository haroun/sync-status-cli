import path from 'node:path'
import fs from 'node:fs/promises'

const list = async pathdir => {
  try {
    const files = await fs.readdir(pathdir, {withFileTypes: true})

    const all = files.reduce(async (acc, file) => {
      const entries = await acc
      const newFiles = file.isDirectory()
        ? await list(path.join(pathdir, file.name))
        : {path: path.normalize(pathdir), name: file.name}

      return entries.concat(newFiles)
    },
    Promise.resolve([]))

    return all
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new TypeError(`invalid path provided "${pathdir}" (ENOENT)`)
    } else if (error.code === 'ENOTDIR') {
      throw new TypeError(`invalid path provided "${pathdir}"; given file, expected directory (ENOTDIR)`)
    }

    throw new Error(error.message)
  }
}

export default list
