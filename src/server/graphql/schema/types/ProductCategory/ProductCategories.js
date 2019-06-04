import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import { productCategoriesDB } from 'server/fakeDatabase'
import ProductCategory from './ProductCategory'


const ProductCategoriesEdges = new GraphQLObjectType({
  name: 'ProductCategoriesEdges',
  fields: () => ({
    next: {
      type: ProductCategory,
      resolve: (productCategories) => productCategoriesDB.getNext(productCategories[productCategories.length - 1]),
    },
    previous: {
      type: ProductCategory,
      resolve: (productCategories) => productCategoriesDB.getPrevious(productCategories[0]),
    },
    first: {
      type: ProductCategory,
      resolve: (productCategories) => productCategories[0],
    },
    last: {
      type: ProductCategory,
      resolve: (productCategories) => productCategories[productCategories.length - 1],
    },
  }),
})

const ProductCategories = new GraphQLObjectType({
  name: 'ProductCategories',
  fields: {
    edges: {
      type: new GraphQLNonNull(ProductCategoriesEdges),
      resolve: (source) => source,
    },
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(ProductCategory)),
      resolve: (source) => source,
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => productCategoriesDB.getList().length,
    },
  },
})

export default ProductCategories
