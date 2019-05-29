const { graphql } = require('graphql')

const root = require('../graphql/root.js')
const schema = require('../graphql/schema.js')


exports.handler = async (event/* , context */) => {
  // if (context.clientContext) {
  //   const { identity, user } = context.clientContext
  // }

  const {
    query,
    variables,
    operationName,
  } = JSON.parse(event.body)

  const result = await graphql(
    schema,
    query,
    root,
    null,
    variables,
    operationName
  )

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
