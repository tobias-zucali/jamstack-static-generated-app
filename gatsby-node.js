const path = require('path')
const webpackConfig = require('./webpack.config.js')


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(webpackConfig)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryPageTemplate = path.resolve('src/templates/CategoryPage/index.js')
  const productPageTemplate = path.resolve('src/templates/ProductPage/index.js')

  const result = await graphql(`
    query loadPagesQuery($limit: Int!) {
      external {
        allProductCategories(limit: $limit) {
          nodes {
            slug
          }
        }
        allProducts {
          nodes {
            slug
            category {
              slug
            }
          }
        }
      }
    }
  `, { limit: 1000 })

  if (result.errors) {
    throw result.errors
  }

  result.data.external.allProductCategories.nodes.forEach(({
    slug: category,
  }) => {
    createPage({
      path: `${category}`,
      component: categoryPageTemplate,
      context: {
        category,
        // The context data can also be used as
        // arguments to the page GraphQL query.
      },
    })
  })

  result.data.external.allProducts.nodes.forEach(({
    slug: product,
    category: { slug: category },
  }) => {
    createPage({
      path: `${category}/${product}`,
      component: productPageTemplate,
      context: {
        category,
        product,
        // The context data can also be used as
        // arguments to the page GraphQL query.
      },
    })
  })
}
