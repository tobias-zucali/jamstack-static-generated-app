import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import ProductCategory from './ProductCategory'
import ProductCategories from './ProductCategories'


export default {
  types: [
    ProductCategory,
    ProductCategories,
  ],
  queryFields: {
    productCategory: {
      type: ProductCategory,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(root, { slug }, { db }) {
        return db.productCategories.getBySlug(slug)
      },
    },
    allProductCategories: {
      type: ProductCategories,
      args: {
        after: {
          type: GraphQLString,
        },
        limit: {
          type: GraphQLInt,
        },
      },
      resolve(root, { after, limit }, { db }) {
        let result = db.productCategories.getList()
        if (after) {
          const previousProductCategory = db.productCategories.getBySlug(after)
          const previousIndex = db.productCategories.getIndex(previousProductCategory)
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
