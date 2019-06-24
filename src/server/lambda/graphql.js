import schema from 'server/graphql/schema'
const { ApolloServer } = require('apollo-server-lambda')


const server = new ApolloServer({ schema })

export const handler = server.createHandler()
