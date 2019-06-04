export default function markdownFileReducer(graphData) {
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
  }
}
