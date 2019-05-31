const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql')

const {
  getProductFields,
  ProductInterface,
  registerProductTypeResolver,
} = require('./Product.js')


const FruitProduct = new GraphQLObjectType({
  name: 'FruitProduct',
  interfaces: [ProductInterface],
  fields: {
    ...getProductFields(),
    vitamins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

registerProductTypeResolver({
  type: FruitProduct,
  value: 'fruit',
})

module.exports = {
  FruitProduct,
}
