import evaluate from 'server/graphql/evaluate'


export async function handler(event/* , context */) {
  // if (context.clientContext) {
  //   const { identity, user } = context.clientContext
  // }

  const {
    query,
    variables,
    operationName,
  } = JSON.parse(event.body)

  const result = await evaluate({
    query,
    variables,
    operationName,
  })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
