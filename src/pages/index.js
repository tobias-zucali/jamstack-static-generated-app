import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import useProductCategories from '../hooks/useProductCategories'

import { initAuth } from '../app/services/auth'
initAuth()


function IndexPage() {
  const productCategories = useProductCategories()
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
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
    </Layout>
  )
}

export default IndexPage
