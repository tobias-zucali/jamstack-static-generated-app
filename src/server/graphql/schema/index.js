import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

import manufacturer from './manufacturer'
import product from './product'
import productCategory from './productCategory'


const allSchemaParts = [
  manufacturer,
  product,
  productCategory,
]


const { types, queryFields } = allSchemaParts.reduce((accumulator, schemaPart) => ({
  types: [
    ...accumulator.types,
    ...schemaPart.types,
  ],
  queryFields: {
    ...accumulator.queryFields,
    ...schemaPart.queryFields,
  },
}), {
  types: [],
  queryFields: {},
})

export default new GraphQLSchema({
  types,
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queryFields,
  }),
})
