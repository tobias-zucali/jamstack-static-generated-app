import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

import {
  types as manufacturerTypes,
  queryFields as manufacturerQueryFields,
} from './types/Manufacturer'
import {
  types as productTypes,
  queryFields as productQueryFields,
} from './types/Product'
import {
  types as productCategoryTypes,
  queryFields as productCategoryQueryFields,
} from './types/ProductCategory'


export default new GraphQLSchema({
  types: [
    ...manufacturerTypes,
    ...productTypes,
    ...productCategoryTypes,
  ],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...manufacturerQueryFields,
      ...productQueryFields,
      ...productCategoryQueryFields,
    },
  }),
})
