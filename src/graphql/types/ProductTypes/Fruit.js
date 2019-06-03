import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import {
  getProductFields,
  ProductInterface,
  registerProductTypeResolver,
} from '../Product'


const Fruit = new GraphQLObjectType({
  name: 'Fruit',
  interfaces: [ProductInterface],
  fields: {
    ...getProductFields(),
    vitamins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

registerProductTypeResolver({
  type: Fruit,
  value: 'fruit',
})

export default Fruit
