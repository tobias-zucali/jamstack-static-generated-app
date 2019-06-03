import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { productCategoriesDB } from '../../fakeDatabase'


export const ProductCategoryEdges = new GraphQLObjectType({
  name: 'ProductCategoryEdges',
  fields: () => ({
    next: {
      type: ProductCategory,
      resolve: ({ index }) => productCategoriesDB.getByIndex(index + 1),
    },
    previous: {
      type: ProductCategory,
      resolve: ({ index }) => productCategoriesDB.getByIndex(index - 1),
    },
  }),
})

const ProductCategory = new GraphQLObjectType({
  name: 'ProductCategory',
  fields: {
    edges: {
      type: ProductCategoryEdges,
      resolve: (root) => ({
        index: productCategoriesDB.getIndex(root),
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
  },
})

export default ProductCategory
