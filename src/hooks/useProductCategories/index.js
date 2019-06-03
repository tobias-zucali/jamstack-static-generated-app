import { useStaticQuery, graphql } from 'gatsby'

import RenderAst from '../../components/RenderAst'


export default function useProductCategories() {
  const data = useStaticQuery(graphql`
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
            excerptAst
            frontmatter {
              intro
              slug
              title
            }
          }
        }
      }
    }
  `)

  const pagesBySlug = data.allFile.nodes.reduce((
    accumulator,
    {
      childMarkdownRemark: {
        excerptAst,
        frontmatter,
      },
    }
  ) => ({
    ...accumulator,
    [frontmatter.slug]: {
      excerptAst,
      ...frontmatter,
    },
  }), {})
  const productCategories = data.external.allProductCategories.nodes.map((productCategory) => {
    const page = pagesBySlug[productCategory.slug] || {}
    return {
      ...productCategory,
      ...page,
      renderExcerpt: () => RenderAst({ ast: page.excerptAst }),
    }
  })
  return productCategories
}
