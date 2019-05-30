const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql')

const {
  Manufacturer,
} = require('./types/Manufacturer.js')

const {
  OfferInterface,
  Offer,
} = require('./types/Offer.js')

const {
  CandyOffer,
} = require('./types/CandyOffer.js')
const {
  FruitOffer,
} = require('./types/FruitOffer.js')

const {
  getOfferById,
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
      // getOffers: {
      //   type: GraphQLString,
      //   args: {
      //     after: { type: GraphQLID },
      //     limit: { type: GraphQLInt },
      //     filter_type: { type: GraphQL?? },
      //   },
      //   resolve(root, args) {
      //     return args.text
      //   },
      // },
    },
  }),
})

module.exports = {
  schema,
  root: null,
}
