import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import useProductCategories from 'hooks/useProductCategories'
import markdownFileReducer from 'utils/markdownFileReducer'

import Layout from 'components/Layout'
import SEO from 'components/SEO'


function CategoriesPage({
  data,
}) {
  const page = markdownFileReducer(data.file)
  const productCategories = useProductCategories()

  return (
    <Layout>
      <SEO title={page.title} keywords={['gatsby', 'application', 'react']} />
      <div>
        <h2>Browse by category</h2>
        <ul>
          {productCategories.map(({
            renderExcerpt,
            name,
            slug,
          }) => (
            <li key={slug}>
              <Link to={`/category/${slug}`}>
                {name}
              </Link>
              {renderExcerpt()}
            </li>
          ))}
        </ul>
      </div>
      {page.renderHtml()}
    </Layout>
  )
}

CategoriesPage.propTypes = {
  data: PropTypes.object,
}

export default CategoriesPage


export const query = graphql`
  query CategoriesPage {
    file(relativeDirectory: {eq: "pages"}, name: {eq: "categories"}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
    }
  }
`
