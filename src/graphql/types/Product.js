const {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
} = require('graphql')

const {
  Manufacturer,
} = require('./Manufacturer.js')

const {
  getProductIndex,
  getProductByIndex,
  getManufacturerById,
} = require('../fakeDatabase/index.js')


const typeResolvers = []

const registerProductTypeResolver = (resolver) => typeResolvers.push(resolver)
const resolveProductType = (source) => {
  for (let index = 0, len = typeResolvers.length; index < len; index += 1) {
    const resolver = typeResolvers[index]
    if (source.type === resolver.value) {
      return resolver.type
    }
  }
  return Product
}
const getProductTypesEnum = () => new GraphQLEnumType({
  name: 'productType',
  values: typeResolvers.reduce((values, { value }) => ({
    [value.toUpperCase()]: { value },
    ...values,
  }), {}),
})

const ProductInterface = new GraphQLInterfaceType({
  name: 'ProductInterface',
  fields: () => ({
    id: {
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

const ProductEdges = new GraphQLObjectType({
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

const getProductFields = () => ({
  edges: {
    type: ProductEdges,
    resolve: (root) => ({
      index: getProductIndex(root),
    }),
  },
  id: {
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
      return getManufacturerById(manufacturer)
    },
  },
})

const Product = new GraphQLObjectType({
  name: 'Product',
  interfaces: [ProductInterface],
  fields: getProductFields(),
})

module.exports = {
  getProductTypesEnum,
  getProductFields,
  ProductInterface,
  ProductEdges,
  Product,
  registerProductTypeResolver,
}
