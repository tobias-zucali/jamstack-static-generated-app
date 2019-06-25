import { useMemo } from 'react'
import { useQuery } from 'urql'

import isBrowser from 'utils/isBrowser'

import prepareSearchResult from './prepareSearchResult'


const searchProductsQuery = `
  query useProductSearch($searchString: String!) {
    searchProducts(searchString: $searchString) {
      nodes {
        matches {
          product {
            pre
            match
            post
          }
          manufacturer {
            pre
            match
            post
          }
          category {
            pre
            match
            post
          }
        }
        node {
          slug
          name
          category {
            slug
          }
        }
      }
    }
  }
`

export default isBrowser() ? function useProductSearch(searchString) {
  const [result] = useQuery({
    query: searchProductsQuery,
    variables: { searchString },
  })
  return useMemo(
    () => prepareSearchResult(result),
    [result]
  )
} : () => []
