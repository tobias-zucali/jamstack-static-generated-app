import { useStaticQuery, graphql } from 'gatsby'
import markdownFileReducer from 'utils/markdownFileReducer'


const EMPTY_PAGE = markdownFileReducer()

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
              slug
              title
            }
          }
        }
      }
    }
  `)

  const pagesBySlug = data.allFile.nodes.reduce((
    pages,
    pageRawData,
  ) => {
    const page = markdownFileReducer(pageRawData)
    return {
      ...pages,
      [page.slug]: page,
    }
  }, {})
  const productCategories = data.external.allProductCategories.nodes.map((productCategory) => {
    const page = pagesBySlug[productCategory.slug] || EMPTY_PAGE
    return {
      ...productCategory,
      ...page,
    }
  })
  return productCategories
}
