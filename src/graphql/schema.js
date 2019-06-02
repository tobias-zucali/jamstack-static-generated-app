import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql'

import Manufacturer, { resolveGetManufacturer } from './types/Manufacturer'
import Manufacturers, { resolveGetManufacturers } from './types/Manufacturers'
import Product, { resolveGetProduct, getProductTypesEnum, ProductInterface } from './types/Product'
import Products, { resolveGetProducts } from './types/Products'
import Candy from './types/Candy'
import Fruit from './types/Fruit'


export default new GraphQLSchema({
  types: [
    Fruit,
    Candy,
    Product,
    Manufacturer,
    ProductInterface,
  ],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      product: {
        type: ProductInterface,
        args: {
          slug: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(root, args) {
          return resolveGetProduct(args)
        },
      },
      allProducts: {
        type: Products,
        args: {
          after: {
            type: GraphQLID,
          },
          limit: {
            type: GraphQLInt,
          },
          // TODO: more advanced filtering – dedicated graphql server module could help
          type: {
            type: getProductTypesEnum(),
          },
          manufacturer: {
            type: GraphQLString, // TODO: implement // TODO: use enum!?!?
          },
        },
        resolve(root, args) {
          return resolveGetProducts(args)
        },
      },
      manufacturer: {
        type: Manufacturer,
        args: {
          slug: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(root, args) {
          return resolveGetManufacturer(args)
        },
      },
      allManufacturers: {
        type: Manufacturers,
        args: {
          after: {
            type: GraphQLID,
          },
          limit: {
            type: GraphQLInt,
          },
        },
        resolve(root, args) {
          return resolveGetManufacturers(args)
        },
      },
    },
  }),
})
