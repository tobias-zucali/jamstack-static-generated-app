import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

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
      resolve(root, { slug }, { db }) {
        return db.manufacturers.getBySlug(slug)
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
      resolve(root, { after, limit }, { db }) {
        let result = db.manufacturers.getList()
        if (after) {
          const previousManufacturer = db.manufacturers.getBySlug(after)
          const previousIndex = db.manufacturers.getIndex(previousManufacturer)
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
