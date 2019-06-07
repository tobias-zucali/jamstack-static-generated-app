import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import { manufacturersDB, productsDB, productCategoriesDB } from 'server/fakeDatabase'
import { ProductInterface } from './Product'
import Products from './Products'
import ProductSearchResults from './ProductSearchResults'


const getProductListArgs = () => ({
  after: {
    type: GraphQLString,
  },
  limit: {
    type: GraphQLInt,
  },
  category: {
    type: GraphQLString,
  },
  manufacturer: {
    type: GraphQLString,
  },
})

const getFilteredProducts = ({
  after,
  limit,
  category,
  manufacturer,
}) => productsDB.getList({
  after,
  filterCallback: (entry) => {
    if (category) {
      return (entry.category === category)
    }
    if (manufacturer) {
      return (entry.manufacturer === manufacturer)
    }
    return true
  },
  limit,
})

const getMatches = (string, searchString) => {
  const lowerCaseString = string.toLowerCase()
  const lowerCaseSearchString = searchString.toLowerCase()
  const index = lowerCaseString.indexOf(lowerCaseSearchString)
  if (index === -1) {
    return null
  }
  return {
    pre: string.substr(0, index),
    match: string.substr(index, searchString.length),
    post: string.substr(index + searchString.length),
  }
}


export default {
  product: {
    type: ProductInterface,
    args: {
      slug: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(root, { slug }) {
      return productsDB.getBySlug(slug)
    },
  },
  allProducts: {
    type: Products,
    args: getProductListArgs(),
    resolve(root, args) {
      return getFilteredProducts(args)
    },
  },
  searchProducts: {
    type: ProductSearchResults,
    args: {
      ...getProductListArgs(),
      searchString: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, {
      searchString,
      limit,
      ...otherArgs
    }) {
      const matchingProducts = getFilteredProducts(
        otherArgs
      ).reduce(
        (accumulator, product) => {
          const matches = {
            product: getMatches(
              product.name,
              searchString
            ),
            manufacturer: getMatches(
              manufacturersDB.getBySlug(product.manufacturer).name,
              searchString
            ),
            category: getMatches(
              productCategoriesDB.getBySlug(product.category).name,
              searchString
            ),
          }
          if (matches.product || matches.manufacturer || matches.category) {
            return [
              ...accumulator,
              {
                matches,
                node: product,
              },
            ]
          } else {
            return accumulator
          }
        },
        []
      )

      if (limit && matchingProducts.length > limit) {
        return matchingProducts.slice(0, limit)
      }
      return matchingProducts
    },
  },
}
