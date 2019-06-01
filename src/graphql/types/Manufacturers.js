import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import Manufacturer from './Manufacturer'

import {
  getManufacturers,
  getManufacturerByIndex,
  getManufacturerBySlug,
  getManufacturerIndex,
} from '../fakeDatabase'


export const resolveGetManufacturers = ({ after, limit }) => {
  let result = getManufacturers()
  if (after) {
    const previousManufacturer = getManufacturerBySlug(after)
    const previousIndex = getManufacturerIndex(previousManufacturer)
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
      resolve: (manufacturers) => {
        const lastIndex = getManufacturerIndex(manufacturers[manufacturers.length - 1])
        return getManufacturerByIndex(lastIndex + 1)
      },
    },
    previous: {
      type: Manufacturer,
      resolve: (manufacturers) => {
        const lastIndex = getManufacturerIndex(manufacturers[0])
        return getManufacturerByIndex(lastIndex - 1)
      },
    },
    first: {
      type: Manufacturer,
      resolve: (manufacturers) => manufacturers[0],
    },
    last: {
      type: Manufacturer,
      resolve: (manufacturers) => manufacturers[manufacturers.length - 1],
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
    manufacturers: {
      type: new GraphQLNonNull(new GraphQLList(Manufacturer)),
      resolve: (source) => source,
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (source) => source.length,
    },
  },
})

export default Manufacturers
