import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import useProductCategories from 'hooks/useProductCategories'
import markdownFileReducer from 'utils/markdownFileReducer'

import RenderAst from 'components/RenderAst'
import Layout from 'components/Layout'
import SEO from 'components/SEO'


function IndexPage({
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
              <Link to={`/${slug}`}>
                {name}
              </Link>
              {renderExcerpt()}
            </li>
          ))}
        </ul>
      </div>
      <RenderAst ast={page.htmlAst} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage


export const query = graphql`
  query indexPage {
    file(relativeDirectory: {eq: "pages"}, name: {eq: "home"}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
    }
  }
`
