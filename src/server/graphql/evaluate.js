import { graphql } from 'graphql'

import getContext from './getContext'
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
    getContext(),
    variables,
    operationName
  )

  return result
}
