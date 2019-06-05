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
})
