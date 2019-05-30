const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql')

const {
  getOfferFields,
  OfferInterface,
  registerOfferTypeResolver,
} = require('./Offer.js')


const FruitOffer = new GraphQLObjectType({
  name: 'FruitOffer',
  interfaces: [OfferInterface],
  fields: {
    ...getOfferFields(),
    vitamins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

registerOfferTypeResolver(({ vitamins }) => vitamins ? FruitOffer : null)

module.exports = {
  FruitOffer,
}
