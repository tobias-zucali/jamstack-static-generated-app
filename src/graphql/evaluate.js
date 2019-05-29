const { graphql } = require('graphql')

const { root, schema } = require('./schema.js')


module.exports = async ({
  query,
  variables,
  operationName,
}) => {
  const result = await graphql(
    schema,
    query,
    root,
    null,
    variables,
    operationName
  )

  return result
}
