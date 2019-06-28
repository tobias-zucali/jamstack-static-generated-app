import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'


export const ProductCategoryEdges = new GraphQLObjectType({
  name: 'ProductCategoryEdges',
  fields: () => ({
    next: {
      type: ProductCategory,
      resolve: ({ index }, args, { db }) => db.productCategories.getByIndex(index + 1),
    },
    previous: {
      type: ProductCategory,
      resolve: ({ index }, args, { db }) => db.productCategories.getByIndex(index - 1),
    },
  }),
})

const ProductCategory = new GraphQLObjectType({
  name: 'ProductCategory',
  fields: {
    edges: {
      type: ProductCategoryEdges,
      resolve: (source, args, { db }) => ({
        index: db.productCategories.getIndex(source),
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
