import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import ProductSearchResult from './ProductSearchResult'


const ProductSearchResults = new GraphQLObjectType({
  name: 'ProductSearchResults',
  fields: {
    // edges: {
    // },
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(ProductSearchResult)),
      resolve: (source) => source,
    },
    // totalCount: {
    // },
  },
})

export default ProductSearchResults
