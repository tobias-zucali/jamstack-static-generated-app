import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  getManufacturerBySlug,
} from '../fakeDatabase'


export const resolveGetManufacturer = ({ slug }) => getManufacturerBySlug(slug)

const Manufacturer = new GraphQLObjectType({
  name: 'TypeInterface',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

export default Manufacturer
