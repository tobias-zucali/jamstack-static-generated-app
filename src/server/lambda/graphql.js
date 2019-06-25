import schema from 'server/graphql/schema'
import { ApolloServer } from 'apollo-server-lambda'


const server = new ApolloServer({
  schema,
  playground: true,
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
  },
})
