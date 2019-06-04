const path = require('path')
const webpackConfig = require('./webpack.config.js')


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(webpackConfig)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryPageTemplate = path.resolve('src/templates/CategoryPage.js')

  const result = await graphql(`
    query loadPagesQuery($limit: Int!) {
      external {
        allProductCategories(limit: $limit) {
          nodes {
            name
            slug
            description
          }
        }
      }
    }
  `, { limit: 1000 })

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages.
  result.data.external.allProductCategories.nodes.forEach((productCategory) => {
    createPage({
      // Path for this page — required
      path: `${productCategory.slug}`,
      component: categoryPageTemplate,
      context: {
        productCategory,
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
