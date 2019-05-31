const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
} = require('graphql')

const {
  Manufacturer,
} = require('./types/Manufacturer.js')

const {
  ProductInterface,
  Product,
  getProductTypesEnum,
} = require('./types/Product.js')
const {
  CandyProduct,
} = require('./types/Candy.js')
const {
  FruitProduct,
} = require('./types/Fruit.js')
const {
  Products,
} = require('./types/Products.js')

const {
  getProductById,
  getProductIndex,
  getProducts,
} = require('./fakeDatabase/index.js')


const schema = new GraphQLSchema({
  types: [
    FruitProduct,
    CandyProduct,
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
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(root, { id }) {
          return getProductById(id)
        },
      },
      getProducts: {
        type: Products,
        args: {
          after: { type: GraphQLID },
          limit: { type: GraphQLInt },
          // TODO: more advanced filtering – dedicated graphql server module could help
          type: { type: getProductTypesEnum() },
        },
        resolve(root, { after, limit, type }) {
          let result = getProducts()
          if (type) {
            result = result.filter((entry) => entry.type === type)
          }
          if (after) {
            const previousProduct = getProductById(after)
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

module.exports = {
  schema,
  root: null,
}
