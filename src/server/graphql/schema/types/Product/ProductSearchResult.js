import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { ProductInterface } from './Product'


export const Match = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    pre: {
      type: new GraphQLNonNull(GraphQLString),
    },
    match: {
      type: new GraphQLNonNull(GraphQLString),
    },
    post: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

export const Matches = new GraphQLObjectType({
  name: 'Matches',
  fields: () => ({
    product: {
      type: Match,
    },
    manufacturer: {
      type: Match,
    },
    category: {
      type: Match,
    },
  }),
})

export const ProductSearchResult = new GraphQLObjectType({
  name: 'ProductSearchResult',
  fields: () => ({
    matches: {
      type: Matches,
    },
    node: {
      type: ProductInterface,
    },
  }),
})

export default ProductSearchResult
