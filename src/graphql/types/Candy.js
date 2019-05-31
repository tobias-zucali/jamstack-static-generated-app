import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'


import {
  convertWeight,
  Weight,
  WEIGHT_UNITS,
} from './Weight'

import {
  getProductFields,
  ProductInterface,
  registerProductTypeResolver,
} from './Product'


export const Candy = new GraphQLObjectType({
  name: 'Candy',
  interfaces: [ProductInterface],
  fields: {
    ...getProductFields(),
    sugar: {
      type: new GraphQLNonNull(GraphQLFloat),
      args: {
        unit: {
          type: Weight,
          defaultValue: WEIGHT_UNITS.G,
        },
      },
      resolve({ sugar }, { unit }) {
        return convertWeight(sugar, unit, WEIGHT_UNITS.G)
      },
    },
  },
})

registerProductTypeResolver({
  type: Candy,
  value: 'candy',
})
