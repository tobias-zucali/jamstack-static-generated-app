import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import Manufacturer from '../manufacturer/Manufacturer'
import ProductCategory from '../productCategory/ProductCategory'

import productTypeExtensions from './productTypeExtensions'


export const ProductInterface = new GraphQLInterfaceType({
  name: 'ProductInterface',
  fields: () => ({
    slug: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    manufacturer: {
      type: Manufacturer,
    },
    edges: {
      type: ProductEdges,
    },
    category: {
      type: new GraphQLNonNull(ProductCategory),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  resolveType: ({ category }) => productTypesByCategory[category] || Product,
})

export const ProductEdges = new GraphQLObjectType({
  name: 'ProductEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: ({ index }, args, { db }) => db.products.getByIndex(index + 1),
    },
    previous: {
      type: ProductInterface,
      resolve: ({ index }, args, { db }) => db.products.getByIndex(index - 1),
    },
  }),
})

export const getProductFields = () => ({
  edges: {
    type: ProductEdges,
    resolve: (root, args, { db }) => ({
      index: db.products.getIndex(root),
    }),
  },
  slug: {
    type: new GraphQLNonNull(GraphQLID),
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  category: {
    type: new GraphQLNonNull(ProductCategory),
    resolve({ category: categorySlug }, args, { db }) {
      return db.productCategories.getBySlug(categorySlug)
    },
  },
  type: {
    type: new GraphQLNonNull(GraphQLString),
    resolve(source, args, context, { parentType }) {
      return parentType
    },
  },
  manufacturer: {
    type: Manufacturer,
    resolve({ manufacturer }, args, { db }) {
      return db.manufacturers.getBySlug(manufacturer)
    },
  },
})

const Product = new GraphQLObjectType({
  name: 'Product',
  interfaces: [ProductInterface],
  fields: getProductFields(),
})

const productTypesByCategory = productTypeExtensions.reduce((types, { category, name, additionalFields }) => ({
  ...types,
  [category]: new GraphQLObjectType({
    name,
    interfaces: [ProductInterface],
    fields: {
      ...getProductFields(),
      ...additionalFields,
    },
  }),
}), {})


export const productTypes = [
  Product,
  ...Object.values(productTypesByCategory),
]
export default Product
