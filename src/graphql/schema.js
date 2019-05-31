import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
} from 'graphql'

import { getProductBySlug, getProductIndex, getProducts } from './fakeDatabase'

import Manufacturer from './types/Manufacturer'
import Product, { ProductInterface, getProductTypesEnum } from './types/Product'
import Candy from './types/Candy'
import Fruit from './types/Fruit'
import Products from './types/Products'


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
      getProduct: {
        type: ProductInterface,
        args: {
          slug: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(root, { slug }) {
          return getProductBySlug(slug)
        },
      },
      getProducts: {
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
        },
        resolve(root, { after, limit, type }) {
          let result = getProducts()
          if (type) {
            result = result.filter((entry) => entry.type === type)
          }
          if (after) {
            const previousProduct = getProductBySlug(after)
            const previousIndex = getProductIndex(previousProduct)
            result = result.slice(previousIndex + 1)
          }
          if (limit) {
            result = result.slice(0, limit)
          }
          return result
        },
      },
    },
  }),
})
