async function fetchGraphQl({
  operationName,
  query,
  variables,
}) {
  const result = await fetch('/.netlify/functions/graphql', {
    method: 'post',
    body: JSON.stringify({
      operationName,
      query,
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const json = await result.json()
  return json
}

export default (options) => typeof options === 'string' ? fetchGraphQl({ query: options }) : fetchGraphQl(options)
