const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('src/templates/Page.js')

  const result = await graphql(`
    query loadPagesQuery($limit: Int!) {
      external {
        allManufacturers(limit: $limit) {
          nodes {
            slug
            name
          }
          totalCount
        }
      }
      allFile(filter: {relativeDirectory: {eq: "productCategories"}}) {
        edges {
          node {
            base
            childMarkdownRemark {
              excerpt
              fileAbsolutePath
              frontmatter {
                intro
                slug
                title
              }
              headings {
                value
                depth
              }
              html
            }
            relativePath
            relativeDirectory
          }
        }
      }
    }
  `, { limit: 1000 })

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages.
  result.data.external.allManufacturers.nodes.forEach((manufacturer) => {
    createPage({
      // Path for this page — required
      path: `${manufacturer.slug}`,
      component: blogPostTemplate,
      context: {
        manufacturer,
        // Add optional context data to be inserted
        // as props into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
      },
    })
  })
}
