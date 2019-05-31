import evaluateGraphql from '../graphql/evaluate'


export async function handler(event/* , context */) {
  // if (context.clientContext) {
  //   const { identity, user } = context.clientContext
  // }

  const {
    query,
    variables,
    operationName,
  } = JSON.parse(event.body)

  const result = await evaluateGraphql({
    query,
    variables,
    operationName,
  })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
