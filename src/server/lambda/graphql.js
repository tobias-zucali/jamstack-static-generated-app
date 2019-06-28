import getContext from 'server/graphql/getContext'
import schema from 'server/graphql/schema'
import { ApolloServer } from 'apollo-server-lambda'


const server = new ApolloServer({
  context: getContext,
  playground: true,
  schema,
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
  },
})
