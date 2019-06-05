import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from 'components/Header'
import './index.css'


const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data) => (
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
        <Header title={data.site.siteMetadata.title} />
        <div
          style={{
            flex: 1,
          }}
        >
          {children}
        </div>
        <footer>
          {data.site.siteMetadata.description}
          <br />
          Browse all products by
          {' '}
          <Link to="categories">Category</Link>
        </footer>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
