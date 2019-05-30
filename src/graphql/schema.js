const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
} = require('graphql')

const {
  Manufacturer,
} = require('./types/Manufacturer.js')

const {
  OfferInterface,
  Offer,
  getOfferTypesEnum,
} = require('./types/Offer.js')
const {
  CandyOffer,
} = require('./types/CandyOffer.js')
const {
  FruitOffer,
} = require('./types/FruitOffer.js')
const {
  Offers,
} = require('./types/Offers.js')

const {
  getOfferById,
  getOfferIndex,
  getOffers,
} = require('./fakeDatabase/index.js')


const schema = new GraphQLSchema({
  types: [
    FruitOffer,
    CandyOffer,
    Offer,
    Manufacturer,
    OfferInterface,
  ],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      getOffer: {
        type: OfferInterface,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(root, { id }) {
          return getOfferById(id)
        },
      },
      getOffers: {
        type: Offers,
        args: {
          after: { type: GraphQLID },
          limit: { type: GraphQLInt },
          // TODO: more advanced filtering – dedicated graphql server module could help
          type: { type: getOfferTypesEnum() },
        },
        resolve(root, { after, limit, type }) {
          let result = getOffers()
          if (type) {
            result = result.filter((entry) => entry.type === type)
          }
          if (after) {
            const previousOffer = getOfferById(after)
            const previousIndex = getOfferIndex(previousOffer)
            result = result.slice(previousIndex + 1)
          }
          if (limit) {
            result = result.slice(0, limit)
          }
          return result
        },
      },
    },
  }),
})

module.exports = {
  schema,
  root: null,
}
