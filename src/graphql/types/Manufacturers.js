import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import Manufacturer from './Manufacturer'

import { manufacturersDB } from '../fakeDatabase'


export const resolveGetManufacturers = ({ after, limit }) => {
  let result = manufacturersDB.getList()
  if (after) {
    const previousManufacturer = manufacturersDB.getBySlug(after)
    const previousIndex = manufacturersDB.getIndex(previousManufacturer)
    result = result.slice(previousIndex + 1)
  }
  if (limit) {
    result = result.slice(0, limit)
  }
  return result
}


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
