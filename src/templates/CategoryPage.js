import React from 'react'
// import PropTypes from 'prop-types'
// import {Link } from 'gatsby'

import Layout from 'components/Layout'
// import Image from 'components/Image'
import SEO from 'components/SEO'


function Page(props) {
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </Layout>
  )
}

Page.propTypes = {
}

export default Page
