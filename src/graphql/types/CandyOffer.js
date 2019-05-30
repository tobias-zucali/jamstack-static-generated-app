const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql')


const {
  Weight,
  convertWeight,
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
      type: new GraphQLNonNull(GraphQLInt),
      args: {
        unit: {
          type: Weight,
          defaultValue: 'g',
        },
      },
      resolve({ sugar }, { unit }) {
        return convertWeight(sugar, unit, 'g')
      },
    },
  },
})

registerOfferTypeResolver(({ sugar }) => sugar ? CandyOffer : null)

module.exports = {
  CandyOffer,
}
