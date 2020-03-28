const list = require('./list')

const diff = async ({source, target}) => {
  const left = await list(source)
  const right = await list(target)

  const rightNames = right.map(file => file.name)

  return left
    .filter(file => !rightNames.includes(file.name))
    .map(file => file.name)
}

module.exports = diff
