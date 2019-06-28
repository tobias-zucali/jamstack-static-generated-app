import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import { ProductInterface } from './Product'


const ProductsEdges = new GraphQLObjectType({
  name: 'ProductsEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: (products, args, { db }) => db.products.getNext(products[products.length - 1]),
    },
    previous: {
      type: ProductInterface,
      resolve: (products, args, { db }) => db.products.getPrevious(products[0]),
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
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(ProductInterface)),
      resolve: (source) => source,
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (source, args, { db }) => db.products.getList().length,
    },
  },
})

export default Products
