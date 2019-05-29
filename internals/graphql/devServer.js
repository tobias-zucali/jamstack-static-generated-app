/* eslint-disable no-console */
const express = require('express')
const graphqlHTTP = require('express-graphql')
const chokidar = require('chokidar')
const path = require('path')


const GRAPHQL_PORT = 4000

let graphQLServer
let graphQLApp
function createGraphQLServer(callback) {
  if (graphQLServer) {
    graphQLServer.removeListener('request', graphQLApp)
    graphQLServer.close()
    delete require.cache[path.resolve('../../src/graphql/schema.js')]
  }
  const { schema, root } = require('../../src/graphql/schema.js') // eslint-disable-line global-require

  graphQLApp = express()
  graphQLApp.use('/', graphqlHTTP({
    graphiql: true,
    pretty: true,
    schema,
    rootValue: root,
  }))
  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(
      `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
    )
    if (callback) {
      callback()
    }
  })
}
createGraphQLServer()

const watcher = chokidar.watch('./src/graphql')
watcher.on('change', (changedPath) => {
  // TODO: does not reload in graphiql yet!!
  console.log(`\`${changedPath}\` changed. Restarting the GraphQL server.`)
  createGraphQLServer(() => console.log('Restart your browser to use the updated schema.'))
})
