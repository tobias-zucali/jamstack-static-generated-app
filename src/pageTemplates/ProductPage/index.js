import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import markdownFileReducer from 'utils/markdownFileReducer'

import Layout from 'components/Layout'
// import Image from 'components/Image'
import SEO from 'components/SEO'


function ProductPage({
  data,
}) {
  const {
    categoryFile,
    productFile,
    external,
  } = data

  const mergedProduct = markdownFileReducer(productFile, external.product)
  const mergedCategory = markdownFileReducer(categoryFile, external.productCategory)

  // eslint-disable-next-line prefer-rest-params
  console.log({ ProductPage: arguments[0] })

  return (
    <Layout>
      <SEO title={mergedProduct.name} keywords={['gatsby', 'application', 'react']} />
      <Link to="/">Home</Link>
      {' | '}
      <Link to={`/${mergedCategory.slug}`}>
        {mergedCategory.name}
      </Link>
      <h2>
        {mergedProduct.name}
      </h2>
      {mergedProduct.renderHtml()}
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductPage


export const query = graphql`
  query ProductPage($category: String!, $product: String!) {
    categoryFile: file(name: {eq: $category}, relativeDirectory: {eq: "productCategories"}) {
      childMarkdownRemark {
        frontmatter {
          name
        }
        htmlAst
      }
    }
    productFile: file(name: {eq: $product}, relativeDirectory: {eq: "products"}) {
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
        slug
        manufacturer {
          name
          description
          address
        }
      }
      productCategory(slug: $category) {
        name
        slug
        description
      }
    }
  }
`
