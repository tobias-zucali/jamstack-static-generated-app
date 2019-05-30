const {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
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
    const resolver = typeResolvers[index]
    if (source.type === resolver.value) {
      return resolver.type
    }
  }
  return Offer
}
const getOfferTypesEnum = () => new GraphQLEnumType({
  name: 'offerType',
  values: typeResolvers.reduce((values, { value }) => ({
    [value.toUpperCase()]: { value },
    ...values,
  }), {}),
})

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
    edges: {
      type: OfferEdges,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  resolveType: resolveOfferType,
})

const OfferEdges = new GraphQLObjectType({
  name: 'OfferEdges',
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
  edges: {
    type: OfferEdges,
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
  getOfferTypesEnum,
  getOfferFields,
  OfferInterface,
  OfferEdges,
  Offer,
  registerOfferTypeResolver,
}
