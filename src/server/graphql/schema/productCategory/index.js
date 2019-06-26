import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import { productCategoriesDB } from 'server/fakeDatabase'
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
      resolve(root, { slug }) {
        return productCategoriesDB.getBySlug(slug)
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
      resolve(root, { after, limit }) {
        let result = productCategoriesDB.getList()
        if (after) {
          const previousProductCategory = productCategoriesDB.getBySlug(after)
          const previousIndex = productCategoriesDB.getIndex(previousProductCategory)
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
