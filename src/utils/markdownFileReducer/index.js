import React from 'react'
import RenderAst from 'components/RenderAst'


export default function markdownFileReducer(graphData) {
  if (!graphData) {
    return {}
  }

  const {
    childMarkdownRemark,
    ...otherRootProps
  } = graphData

  const {
    frontmatter,
    ...otherRemarkProps
  } = childMarkdownRemark

  return {
    ...otherRootProps,
    ...otherRemarkProps,
    ...frontmatter,
    renderHtml: () => <RenderAst ast={childMarkdownRemark.htmlAst} />,
    renderExcerpt: () => <RenderAst ast={childMarkdownRemark.excerptAst} />,
  }
}
