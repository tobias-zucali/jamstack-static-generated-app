const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql')

const {
  OfferInterface,
} = require('./Offer.js')

const {
  getOfferByIndex,
  getOfferIndex,
} = require('../fakeDatabase/index.js')


const OffersEdges = new GraphQLObjectType({
  name: 'OffersEdges',
  fields: () => ({
    next: {
      type: OfferInterface,
      resolve: (offers) => {
        const lastIndex = getOfferIndex(offers[offers.length - 1])
        return getOfferByIndex(lastIndex + 1)
      },
    },
    previous: {
      type: OfferInterface,
      resolve: (offers) => {
        const lastIndex = getOfferIndex(offers[0])
        return getOfferByIndex(lastIndex - 1)
      },
    },
    first: {
      type: OfferInterface,
      resolve: (offers) => offers[0],
    },
    last: {
      type: OfferInterface,
      resolve: (offers) => offers[offers.length - 1],
    },
  }),
})

const Offers = new GraphQLObjectType({
  name: 'Offers',
  fields: {
    edges: {
      type: new GraphQLNonNull(OffersEdges),
      resolve: (source) => source,
    },
    offers: {
      type: new GraphQLNonNull(new GraphQLList(OfferInterface)),
      resolve: (source) => source,
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (source) => source.length,
    },
  },
})

module.exports = {
  Offers,
}
