import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import {
  ProductInterface,
} from './Product'

import { productsDB } from '../fakeDatabase'


export const resolveGetProducts = ({ after, limit, type }) => productsDB.getList({
  after,
  filterCallback: (entry) => type ? entry.type === type : true,
  limit,
})

const ProductsEdges = new GraphQLObjectType({
  name: 'ProductsEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: (products) => productsDB.getNext(products[products.length - 1]),
    },
    previous: {
      type: ProductInterface,
      resolve: (products) => productsDB.getPrevious(products[0]),
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
