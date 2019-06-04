import {
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'


export default {
  name: 'Fruit',
  category: 'fruit',
  additionalFields: {
    vitamins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
}
