import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'


function ProductCategories({
  render,
}) {
  return (
    <StaticQuery
      query={graphql`
        query ProductCategories {
          external {
            allProductCategories {
              nodes {
                name
                slug
                description
              }
            }
          }
          allFile(filter: {relativeDirectory: {eq: "productCategories"}}) {
            nodes {
              childMarkdownRemark {
                html
                frontmatter {
                  intro
                  slug
                  title
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const productCategoriesPagesBySlug = data.allFile.nodes.reduce((result, { childMarkdownRemark }) => ({
          ...result,
          [childMarkdownRemark.frontmatter.slug]: {
            html: childMarkdownRemark.html,
            ...childMarkdownRemark.frontmatter,
          },
        }), {})
        const productCategories = data.external.allProductCategories.nodes.map((productCategory) => ({
          ...productCategory,
          ...productCategoriesPagesBySlug[productCategory.slug],
        }))
        return render({
          productCategories,
        })
      }}
    />
  )
}

ProductCategories.propTypes = {
  render: PropTypes.func,
}

export default ProductCategories
