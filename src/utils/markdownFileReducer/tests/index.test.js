import markdownFileReducer from '../index'


const demoPage = {
  childMarkdownRemark: {
    frontmatter: {
      title: 'Welcome!',
    },
    htmlAst: '{...}',
  },
  name: 'home',
}

describe('utils/markdownFileReducer', () => {
  it('resolves markdown files from graphql api', () => {
    expect(
      markdownFileReducer(demoPage)
    ).toEqual({
      htmlAst: '{...}',
      name: 'home',
      title: 'Welcome!',
      renderExcerpt: expect.any(Function),
      renderHtml: expect.any(Function),
    })
  })

  it('does not crash if no data is provided', () => {
    const emptyFile = markdownFileReducer()
    expect(
      emptyFile
    ).toEqual({
      renderExcerpt: expect.any(Function),
      renderHtml: expect.any(Function),
    })

    expect(
      emptyFile.renderExcerpt()
    ).toBe(null)
    expect(
      emptyFile.renderHtml()
    ).toBe(null)
  })
})
