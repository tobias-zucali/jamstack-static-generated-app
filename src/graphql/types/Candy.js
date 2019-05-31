const {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql')


const {
  convertWeight,
  Weight,
  WEIGHT_UNITS,
} = require('./Weight.js')

const {
  getProductFields,
  ProductInterface,
  registerProductTypeResolver,
} = require('./Product.js')


const CandyProduct = new GraphQLObjectType({
  name: 'CandyProduct',
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
  type: CandyProduct,
  value: 'candy',
})

module.exports = {
  CandyProduct,
}
