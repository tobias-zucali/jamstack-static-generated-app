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
  join(path = '', pathPart = '') {
    return this.addSlash(path) + this.removeTrailingSlash(pathPart)
  },
}
