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
  getOfferFields,
  OfferInterface,
  registerOfferTypeResolver,
} = require('./Offer.js')


const CandyOffer = new GraphQLObjectType({
  name: 'CandyOffer',
  interfaces: [OfferInterface],
  fields: {
    ...getOfferFields(),
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

registerOfferTypeResolver({
  type: CandyOffer,
  value: 'candy',
})

module.exports = {
  CandyOffer,
}
