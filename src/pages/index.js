import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import markdownFileReducer from 'utils/markdownFileReducer'

import Layout from 'components/Layout'
import SEO from 'components/SEO'
import Search from 'components/Search'


function IndexPage({
  data,
}) {
  const page = markdownFileReducer(data.file)

  return (
    <Layout>
      <SEO title={page.title} keywords={['gatsby', 'application', 'react']} />
      <Search />
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
