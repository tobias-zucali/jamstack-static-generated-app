import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import markdownFileReducer from 'utils/markdownFileReducer'
import path from 'utils/path'
import log from 'utils/log'

import Layout from 'components/Layout'
// import Image from 'components/Image'
import SEO from 'components/SEO'


function CategoryPage({
  data,
  location,
  ...otherProps
}) {
  const page = markdownFileReducer(data.file)

  log.dev('CategoryPage', { ...otherProps, data })

  return (
    <Layout>
      <SEO title={page.name} keywords={['gatsby', 'application', 'react']} />
      <Link to="/">Home</Link>
      <h2>
        {page.name}
      </h2>
      {page.renderHtml()}
      <ul>
        {data.external.allProducts.nodes.map(({ name, slug, manufacturer }) => (
          <li key={slug}>
            <Link to={path.join(location.pathname, slug)}>
              {`${name} (${manufacturer.name})`}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

CategoryPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.object.isRequired,
    external: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default CategoryPage

export const query = graphql`
  query CategoryPage($category: String) {
    file(name: {eq: $category}, relativeDirectory: {eq: "productCategories"}) {
      childMarkdownRemark {
        frontmatter {
          name
        }
        htmlAst
      }
    }
    external {
      allProducts(category: $category) {
        nodes {
          name
          slug
          manufacturer {
            name
            description
            address
          }
        }
      }
    }
  }
`
