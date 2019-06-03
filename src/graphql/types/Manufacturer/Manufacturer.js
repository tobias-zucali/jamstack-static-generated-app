import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { manufacturersDB } from '../../fakeDatabase'


export const ManufacturerEdges = new GraphQLObjectType({
  name: 'ManufacturerEdges',
  fields: () => ({
    next: {
      type: Manufacturer,
      resolve: ({ index }) => manufacturersDB.getByIndex(index + 1),
    },
    previous: {
      type: Manufacturer,
      resolve: ({ index }) => manufacturersDB.getByIndex(index - 1),
    },
  }),
})

const Manufacturer = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: {
    edges: {
      type: ManufacturerEdges,
      resolve: (root) => ({
        index: manufacturersDB.getIndex(root),
      }),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
  },
})

export default Manufacturer
