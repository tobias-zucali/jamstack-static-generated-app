import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import { manufacturersDB } from 'server/fakeDatabase'
import Manufacturer from '../Manufacturer'


const ManufacturersEdges = new GraphQLObjectType({
  name: 'ManufacturersEdges',
  fields: () => ({
    next: {
      type: Manufacturer,
      resolve: (manufacturer) => manufacturersDB.getNext(manufacturer[manufacturer.length - 1]),
    },
    previous: {
      type: Manufacturer,
      resolve: (manufacturer) => manufacturersDB.getPrevious(manufacturer[0]),
    },
    first: {
      type: Manufacturer,
      resolve: (manufacturer) => manufacturer[0],
    },
    last: {
      type: Manufacturer,
      resolve: (manufacturer) => manufacturer[manufacturer.length - 1],
    },
  }),
})

const Manufacturers = new GraphQLObjectType({
  name: 'Manufacturers',
  fields: {
    edges: {
      type: new GraphQLNonNull(ManufacturersEdges),
      resolve: (source) => source,
    },
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(Manufacturer)),
      resolve: (source) => source,
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => manufacturersDB.getList().length,
    },
  },
})

export default Manufacturers
