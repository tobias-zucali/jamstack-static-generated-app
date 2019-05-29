/* eslint-disable no-console */
const express = require('express')
const graphqlHTTP = require('express-graphql')
const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')


const GRAPHQL_PORT = 4000

const graphQLApp = express()
let graphqlHTTPcallback

function createGraphQLServer() {
  if (graphqlHTTPcallback) {
    graphQLApp.delete('/', graphqlHTTPcallback)
  }
  const { schema, root } = require('../../src/graphql/schema.js') // eslint-disable-line global-require

  graphqlHTTPcallback = graphqlHTTP({
    graphiql: true,
    pretty: true,
    schema,
    rootValue: root,
  })

  graphQLApp.use('/', graphqlHTTPcallback)
}

createGraphQLServer()
graphQLApp.listen(GRAPHQL_PORT, () => {
  console.log(
    `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
  )
})

const watchDirectory = path.resolve(__dirname, '../../src/graphql')
const watchedFiles = fs.readdirSync(watchDirectory).map(
  (fileName) => path.resolve(watchDirectory, fileName)
)

const watcher = chokidar.watch(watchDirectory)
watcher.on('change', (changedPath) => {
  // TODO: does not reload in graphiql yet!!
  console.log(`\`${changedPath}\` changed. Restarting the GraphQL server.`)
  watchedFiles.forEach(
    (fileName) => delete require.cache[fileName]
  )
  createGraphQLServer(() => console.log('Restart your browser to use the updated schema.'))
})
