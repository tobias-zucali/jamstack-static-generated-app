import React from 'react'
import PropTypes, { arrayOf } from 'prop-types'
import { graphql, Link } from 'gatsby'

import markdownFileReducer from 'utils/markdownFileReducer'

import Layout from 'components/Layout'
// import Image from 'components/Image'
import SEO from 'components/SEO'


const joinPath = (path = '', pathPart = '') => (path[path.length - 1] === '/' ? path : `${path}/`) + pathPart


function CategoryPage({
  data,
  location,
  ...otherProps
}) {
  const page = markdownFileReducer(data.file)

  console.log({ CategoryPage: { ...otherProps, data } })
  console.log({ nodes: data.external.allProducts.nodes })

  return (
    <Layout>
      <SEO title={page.title} keywords={['gatsby', 'application', 'react']} />
      {page.renderHtml()}
      <ul>
        {data.external.allProducts.nodes.map(({ name, slug, manufacturer }) => (
          <li key={slug}>
            <Link to={joinPath(location.pathname, slug)}>
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
    external: PropTypes.shape({
      allProducts: PropTypes.shape({
        nodes: arrayOf(PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default CategoryPage

export const query = graphql`
  query CategoryPage($slug: String) {
    file(name: {eq: $slug}, relativeDirectory: {eq: "productCategories"}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
      name
    }
    external {
      allProducts(category: $slug) {
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
