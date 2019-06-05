import path from '../index'


describe('utils/path', () => {
  it('normalize a path', () => {
    expect(path.normalize('hey')).toBe('hey')
    expect(path.normalize('/hey')).toBe('/hey')
    expect(path.normalize('/hey/')).toBe('/hey/')
    expect(path.normalize('/   hey   /')).toBe('/hey/')
    expect(path.normalize('/  /hey / // ho   /')).toBe('/hey/ho/')
  })
  it('removes a slash', () => {
    expect(path.removeSlash('hey')).toBe('hey')
    expect(path.removeSlash('hey/')).toBe('hey')
    expect(path.removeSlash('/hey/')).toBe('/hey')
    expect(path.removeSlash('/hey/ho/')).toBe('/hey/ho')
    expect(path.removeSlash(' hey/   ')).toBe('hey')
    expect(path.removeSlash('hey /')).toBe('hey')
    expect(path.removeSlash('hey////')).toBe('hey')
  })
  it('adds a slash', () => {
    expect(path.addSlash('hey')).toBe('hey/')
    expect(path.addSlash('hey/')).toBe('hey/')
    expect(path.addSlash('/hey/')).toBe('/hey/')
    expect(path.addSlash('/hey/ho/')).toBe('/hey/ho/')
    expect(path.addSlash(' hey/   ')).toBe('hey/')
    expect(path.addSlash('hey /')).toBe('hey/')
    expect(path.addSlash('hey////')).toBe('hey/')
  })
  it('removes trailing slash', () => {
    expect(path.removeTrailingSlash('hey')).toBe('hey')
    expect(path.removeTrailingSlash('/hey')).toBe('hey')
    expect(path.removeTrailingSlash('/  /  ///hey')).toBe('hey')
  })
  it('joins paths', () => {
    expect(path.join('hey', 'ho')).toBe('hey/ho')
    expect(path.join('/hey', 'ho')).toBe('/hey/ho')
    expect(path.join('/  /  ///hey', '/// ho')).toBe('/hey/ho')
  })
})
