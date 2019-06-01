import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import {
  ProductInterface,
} from './Product'

import {
  getProductByIndex,
  getProductBySlug,
  getProductIndex,
  getProducts,
} from '../fakeDatabase'


export const resolveGetProducts = ({ after, limit, type }) => {
  let result = getProducts()
  if (type) {
    result = result.filter((entry) => entry.type === type)
  }
  if (after) {
    const previousProduct = getProductBySlug(after)
    const previousIndex = getProductIndex(previousProduct)
    result = result.slice(previousIndex + 1)
  }
  if (limit) {
    result = result.slice(0, limit)
  }
  return result
}

const ProductsEdges = new GraphQLObjectType({
  name: 'ProductsEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: (products) => {
        const lastIndex = getProductIndex(products[products.length - 1])
        return getProductByIndex(lastIndex + 1)
      },
    },
    previous: {
      type: ProductInterface,
      resolve: (products) => {
        const lastIndex = getProductIndex(products[0])
        return getProductByIndex(lastIndex - 1)
      },
    },
    first: {
      type: ProductInterface,
      resolve: (products) => products[0],
    },
    last: {
      type: ProductInterface,
      resolve: (products) => products[products.length - 1],
    },
  }),
})

const Products = new GraphQLObjectType({
  name: 'Products',
  fields: {
    edges: {
      type: new GraphQLNonNull(ProductsEdges),
      resolve: (source) => source,
    },
    products: {
      type: new GraphQLNonNull(new GraphQLList(ProductInterface)),
      resolve: (source) => source,
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (source) => source.length,
    },
  },
})

export default Products
