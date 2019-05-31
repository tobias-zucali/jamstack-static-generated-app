import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import fetchGraphql from '../utils/fetchGraphql'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import { initAuth } from '../app/services/auth'
initAuth()

class IndexPage extends React.Component {
  state = { loading: false, msg: null }
  handleClick = (e) => {
    e.preventDefault()

    this.setState({ loading: true })
    fetchGraphql(`
      {
        getProducts {
          products {
            id
            name
          }
        }
      }
    `).then(
      (result) => this.setState({ loading: false, msg: `\n${JSON.stringify(result, null, 2)}\n` })
    )
  }

  render() {
    const { loading, msg } = this.state
    const { data } = this.props
    // const { products } = data.external.getProducts

    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p>
              {data.site.siteMetadata.description}
            </p>
            <ul>
              <li>
                This site has statically generated marketing pages like this one and
                {' '}
                <Link to="/page-2/">page 2.</Link>
                {' '}
              </li>
              <li>
                It also has a dynamically generated clientside app guarded by
                authentication:
                <ul>
                  <li>
                    <Link to="/app/">
                      <b>Go to App (with Netlify Identity)</b>
                    </Link>
                    {' '}
                  </li>
                  {/* {products.map(({ name, id }) => (
                    <li key={id}>
                      {name}
                    </li>
                  ))} */}
                </ul>
              </li>
              <li>
                You can
                {' '}
                <a href="https://github.com/sw-yx/jamstack-hackathon-starter">
                  view source here
                </a>
              </li>
              <li>
                or see
                {' '}
                <a href="https://youtu.be/bueXJInQt2c">
                  the Youtube walkthrough
                </a>
              </li>
              <li>
                or
                <a href="https://app.netlify.com/start/deploy?repository=https://github.com/sw-yx/jamstack-hackathon-starter&stack=cms">
                  <img
                    src="https://www.netlify.com/img/deploy/button.svg"
                    alt="Deploy to Netlify"
                  />
                </a>
              </li>
            </ul>
            <hr />
            <p>
              You can still access Netlify functions even on static pages:
              {' '}
            </p>
            <button onClick={this.handleClick}>
              {loading ? 'Loading...' : 'Call Lambda Function'}
            </button>
            <br />
            <pre>
              {msg
                ? `Here is the response: ${msg}`
                : 'click the button and watch this!'}
            </pre>
          </div>
          <div
            style={{
              borderLeft: 'brown',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <p>Now go build something great.</p>
            <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
              <Image />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }

    # external {
    #   getProducts {
    #     products {
    #       name
    #       id
    #     }
    #   }
    # }
  }
`
