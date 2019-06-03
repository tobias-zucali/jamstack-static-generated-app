import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductCategories from '../components/ProductCategories'

import { initAuth } from '../app/services/auth'
initAuth()


ProductCategories.propTypes = {
  render: PropTypes.func,
}

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <ProductCategories
        render={({ productCategories }) => (
          <div>
            <h2>Browse by category</h2>
            <ul>
              {productCategories.map(({ name, html, slug }) => (
                <li key={slug}>
                  <Link to={`/${slug}`}>
                    {name}
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      />
    </Layout>
  )
}

export default IndexPage
