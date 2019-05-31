import { graphql } from 'graphql'

import schema from './schema'


export default async function evaluate({
  query,
  variables,
  operationName,
}) {
  const result = await graphql(
    schema,
    query,
    null,
    null,
    variables,
    operationName
  )

  return result
}
