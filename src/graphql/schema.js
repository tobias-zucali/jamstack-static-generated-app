const {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql')

const {
  offers: fakeOffers,
  manufacturer: fakeManufacturers,
} = require('./fake-database.json')
const {
  WeightType,
  convertWeight,
} = require('./weight.js')


const getOfferById = (id) => fakeOffers.find((entry) => entry.id === id)
const getOfferIndex = (offer) => fakeOffers.indexOf(offer)
const getOfferByIndex = (index) => fakeOffers[index]

const getManufacturerById = (id) => fakeManufacturers.find((entry) => entry.id === id)

const Manufacturer = new GraphQLObjectType({
  name: 'TypeInterface',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
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
    cursors: {
      type: OfferCursors,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  resolveType: ({ sugar, vitamins }) => {
    if (sugar) {
      return CandyOffer
    }
    if (vitamins) {
      return FruitOffer
    }
    return DefaultOffer
  },
})

// TODO: how to add cursors to OfferInterface? Circular dependency!
const OfferCursors = new GraphQLObjectType({
  name: 'OfferCursors',
  fields: {
    next: {
      type: OfferInterface,
      resolve: ({ index }) => getOfferByIndex(index + 1),
    },
    previous: {
      type: OfferInterface,
      resolve: ({ index }) => getOfferByIndex(index - 1),
    },
  },
})

const getDefaultOfferFields = () => ({
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

const DefaultOffer = new GraphQLObjectType({
  name: 'Offer',
  interfaces: [OfferInterface],
  fields: getDefaultOfferFields(),
})


const CandyOffer = new GraphQLObjectType({
  name: 'CandyOffer',
  interfaces: [OfferInterface],
  fields: {
    ...getDefaultOfferFields(),
    sugar: {
      type: new GraphQLNonNull(GraphQLInt),
      args: {
        unit: {
          type: WeightType,
          defaultValue: 'g',
        },
      },
      resolve({ sugar }, { unit }) {
        return convertWeight(sugar, unit, 'g')
      },
    },
  },
})

const FruitOffer = new GraphQLObjectType({
  name: 'FruitOffer',
  interfaces: [OfferInterface],
  fields: {
    ...getDefaultOfferFields(),
    vitamins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const schema = new GraphQLSchema({
  types: [
    FruitOffer,
    CandyOffer,
    DefaultOffer,
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
