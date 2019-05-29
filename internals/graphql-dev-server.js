/* eslint-disable no-console */
const express = require('express')
const graphqlHTTP = require('express-graphql')

const rootValue = require('../src/graphql/root.js')
const schema = require('../src/graphql/schema.js')

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
