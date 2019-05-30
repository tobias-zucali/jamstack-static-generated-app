const {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const {
  Manufacturer,
} = require('../types/Manufacturer.js')

const {
  getOfferIndex,
  getOfferByIndex,
  getManufacturerById,
} = require('../fakeDatabase/index.js')


const typeResolvers = []

const registerOfferTypeResolver = (resolver) => typeResolvers.push(resolver)
const resolveOfferType = (source) => {
  for (let index = 0, len = typeResolvers.length; index < len; index += 1) {
    const type = typeResolvers[index](source)
    if (type) {
      return type
    }
  }
  return Offer
}

const OfferInterface = new GraphQLInterfaceType({
  name: 'OfferInterface',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    manufacturer: {
      type: Manufacturer,
    },
    cursors: {
      type: OfferCursors,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  resolveType: resolveOfferType,
})

const OfferCursors = new GraphQLObjectType({
  name: 'OfferCursors',
  fields: () => ({
    next: {
      type: OfferInterface,
      resolve: ({ index }) => getOfferByIndex(index + 1),
    },
    previous: {
      type: OfferInterface,
      resolve: ({ index }) => getOfferByIndex(index - 1),
    },
  }),
})

const getOfferFields = () => ({
  cursors: {
    type: OfferCursors,
    resolve: (root) => ({
      index: getOfferIndex(root),
    }),
  },
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  type: {
    type: new GraphQLNonNull(GraphQLString),
    resolve(source, args, context, { parentType }) {
      return parentType
    },
  },
  manufacturer: {
    type: Manufacturer,
    resolve({ manufacturer }) {
      return getManufacturerById(manufacturer)
    },
  },
})

const Offer = new GraphQLObjectType({
  name: 'Offer',
  interfaces: [OfferInterface],
  fields: getOfferFields(),
})

module.exports = {
  getOfferFields,
  OfferInterface,
  OfferCursors,
  Offer,
  registerOfferTypeResolver,
}
