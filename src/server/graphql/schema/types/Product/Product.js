import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { manufacturersDB, productsDB, productCategoriesDB } from 'server/fakeDatabase'
import Manufacturer from '../Manufacturer'
import ProductCategory from '../ProductCategory'

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
  resolveType: ({ category }) => productTypes[category] || Product,
})

export const ProductEdges = new GraphQLObjectType({
  name: 'ProductEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: ({ index }) => productsDB.getByIndex(index + 1),
    },
    previous: {
      type: ProductInterface,
      resolve: ({ index }) => productsDB.getByIndex(index - 1),
    },
  }),
})

export const getProductFields = () => ({
  edges: {
    type: ProductEdges,
    resolve: (root) => ({
      index: productsDB.getIndex(root),
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
    resolve({ category: categorySlug }) {
      return productCategoriesDB.getBySlug(categorySlug)
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
    resolve({ manufacturer }) {
      return manufacturersDB.getBySlug(manufacturer)
    },
  },
})

const Product = new GraphQLObjectType({
  name: 'Product',
  interfaces: [ProductInterface],
  fields: getProductFields(),
})

const productTypes = productTypeExtensions.reduce((types, { category, name, additionalFields }) => ({
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


export const allProductTypes = [
  Product,
  ProductInterface,
  ...Object.values(productTypes),
]
export default Product
