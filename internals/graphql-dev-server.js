var express = require('express');
var graphqlHTTP = require('express-graphql');

var rootValue = require('../src/graphql/root.js')
var schema = require('../src/graphql/schema.js')

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');