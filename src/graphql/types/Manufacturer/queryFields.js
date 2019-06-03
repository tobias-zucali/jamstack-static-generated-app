import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql'

import Manufacturer from './Manufacturer'
import Manufacturers from './Manufacturers'

import { manufacturersDB } from '../../fakeDatabase'


export default {
  manufacturer: {
    type: Manufacturer,
    args: {
      slug: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(root, { slug }) {
      return manufacturersDB.getBySlug(slug)
    },
  },
  allManufacturers: {
    type: Manufacturers,
    args: {
      after: {
        type: GraphQLID,
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
}
