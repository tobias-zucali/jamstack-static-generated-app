import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import { productsDB } from 'server/fakeDatabase'
import { ProductInterface } from './Product'
import Products from './Products'


export default {
  product: {
    type: ProductInterface,
    args: {
      slug: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(root, { slug }) {
      return productsDB.getBySlug(slug)
    },
  },
  allProducts: {
    type: Products,
    args: {
      after: {
        type: GraphQLID,
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
    },
    resolve(root, { after, limit, category }) {
      return productsDB.getList({
        after,
        filterCallback: (entry) => category ? entry.category === category : true,
        limit,
      })
    },
  },
}
