import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
} from 'graphql'

import { getProductIndex, getProductByIndex, getManufacturerBySlug } from '../fakeDatabase/index'

import Manufacturer from './Manufacturer'


const typeResolvers = []

export const registerProductTypeResolver = (resolver) => typeResolvers.push(resolver)
export const resolveProductType = (source) => {
  for (let index = 0, len = typeResolvers.length; index < len; index += 1) {
    const resolver = typeResolvers[index]
    if (source.type === resolver.value) {
      return resolver.type
    }
  }
  return Product
}
export const getProductTypesEnum = () => new GraphQLEnumType({
  name: 'productType',
  values: typeResolvers.reduce((values, { value }) => ({
    [value.toUpperCase()]: { value },
    ...values,
  }), {}),
})

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
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  resolveType: resolveProductType,
})

export const ProductEdges = new GraphQLObjectType({
  name: 'ProductEdges',
  fields: () => ({
    next: {
      type: ProductInterface,
      resolve: ({ index }) => getProductByIndex(index + 1),
    },
    previous: {
      type: ProductInterface,
      resolve: ({ index }) => getProductByIndex(index - 1),
    },
  }),
})

export const getProductFields = () => ({
  edges: {
    type: ProductEdges,
    resolve: (root) => ({
      index: getProductIndex(root),
    }),
  },
  slug: {
    type: new GraphQLNonNull(GraphQLID),
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
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
      return getManufacturerBySlug(manufacturer)
    },
  },
})

const Product = new GraphQLObjectType({
  name: 'Product',
  interfaces: [ProductInterface],
  fields: getProductFields(),
})

export default Product
