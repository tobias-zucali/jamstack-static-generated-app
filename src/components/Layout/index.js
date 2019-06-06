import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'

import 'normalize.css'
import Header from 'components/Header'
import './index.css'


function Layout({ children }) {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: 960,
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <Header title={site.siteMetadata.title} />
      <div
        style={{
          flex: 1,
        }}
      >
        {children}
      </div>
      <footer>
        {site.siteMetadata.description}
        <br />
        Browse all products by
        {' '}
        <Link to="/categories">Category</Link>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
