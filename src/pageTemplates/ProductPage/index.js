import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from 'components/Layout'
// import Image from 'components/Image'
import SEO from 'components/SEO'


function ProductPage({
  data,
  pageContext,
}) {
  const { product } = data.external

  // eslint-disable-next-line prefer-rest-params
  console.log({ ProductPage: arguments[0] })

  return (
    <Layout>
      <SEO title={product.name} keywords={['gatsby', 'application', 'react']} />
      <Link to="/">Home</Link>
      {' | '}
      <Link to={`/${pageContext.category}`}>Category</Link>
      <h2>{product.name}</h2>
      {/* {page.renderHtml()} */}
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    categoryFile: PropTypes.object.isRequired,
    external: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductPage

export const query = graphql`
  query ProductPage($category: String, $product: ID!) {
    categoryFile: file(name: {eq: $category}, relativeDirectory: {eq: "productCategories"}) {
      childMarkdownRemark {
        frontmatter {
          name
        }
        htmlAst
      }
    }
    external {
      product(slug: $product) {
        name
        manufacturer {
          name
          description
          address
        }
      }
    }
  }
`
