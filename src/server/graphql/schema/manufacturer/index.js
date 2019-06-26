import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import { manufacturersDB } from 'server/fakeDatabase'

import Manufacturer from './Manufacturer'
import Manufacturers from './Manufacturers'


export default {
  types: [
    Manufacturer,
    Manufacturers,
  ],
  queryFields: {
    manufacturer: {
      type: Manufacturer,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(root, { slug }) {
        return manufacturersDB.getBySlug(slug)
      },
    },
    allManufacturers: {
      type: Manufacturers,
      args: {
        after: {
          type: GraphQLString,
        },
        limit: {
          type: GraphQLInt,
        },
      },
      resolve(root, { after, limit }) {
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
      },
    },
  },
}
