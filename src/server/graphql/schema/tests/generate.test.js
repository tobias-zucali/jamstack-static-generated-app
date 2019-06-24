import { getSchemaString, getSchemaStringFromFile } from '../generate'

describe('graphql schema generate', () => {
  it('matches the generated schema string', () => {
    expect(
      getSchemaStringFromFile()
    ).toBe(
      getSchemaString()
    )
  })
})
