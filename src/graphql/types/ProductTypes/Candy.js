import {
  GraphQLObjectType,
} from 'graphql'


import getWeightAttribute from '../getWeightAttribute'

import { getProductFields, ProductInterface, registerProductTypeResolver } from '../Product'


const Candy = new GraphQLObjectType({
  name: 'Candy',
  interfaces: [ProductInterface],
  fields: {
    ...getProductFields(),
    sugar: getWeightAttribute(),
  },
})

registerProductTypeResolver({
  type: Candy,
  value: 'candy',
})

export default Candy
