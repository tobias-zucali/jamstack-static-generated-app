const SEPARATOR_REGEX = /\s*\/+(\s*\/*)*/g

export default {
  normalize(path = '') {
    return path.trim().replace(SEPARATOR_REGEX, '/')
  },
  addSlash(path) {
    return `${this.removeSlash(path)}/`
  },
  removeSlash(path) {
    const resultPath = this.normalize(path)
    if (resultPath[resultPath.length - 1] === '/') {
      return resultPath.substr(0, resultPath.length - 1)
    }
    return resultPath
  },
  removeTrailingSlash(path) {
    const resultPath = this.normalize(path)
    if (resultPath[0] === '/') {
      return resultPath.substr(1)
    }
    return resultPath
  },
  join(path = '', nextPathPart = '', ...otherParts) {
    const newPath = this.addSlash(path) + this.removeTrailingSlash(nextPathPart)
    if (otherParts.length > 0) {
      return this.join(newPath, ...otherParts)
    } else {
      return newPath
    }
  },
}
