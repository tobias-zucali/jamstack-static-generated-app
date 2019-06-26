import evaluate from 'server/graphql/evaluate'


describe('graphql/searchProducts', () => {
  it('returns all products with empty string', async () => {
    await expect(
      evaluate({
        query: `
            {
              searchProducts(searchString: "") {
                nodes {
                  node {
                    slug
                    name
                  }
                }
              }
            }
          `,
      })
    ).resolves.toMatchSnapshot()
  })

  it('returns all products containing "ap"', async () => {
    await expect(
      evaluate({
        query: `
            {
              searchProducts(searchString: "ap") {
                nodes {
                  matches {
                    product {
                      pre
                      match
                      post
                    }
                    manufacturer {
                      pre
                      match
                      post
                    }
                    category {
                      pre
                      match
                      post
                    }
                  }
                  node {
                    slug
                    name
                  }
                }
              }
            }
          `,
      })
    ).resolves.toMatchSnapshot()
  })

  it('returns all products with match in manufacturer', async () => {
    await expect(
      evaluate({
        query: `
            {
              searchProducts(searchString: "earth") {
                nodes {
                  matches {
                    product {
                      pre
                      match
                      post
                    }
                    manufacturer {
                      pre
                      match
                      post
                    }
                    category {
                      pre
                      match
                      post
                    }
                  }
                  node {
                    slug
                    name
                  }
                }
              }
            }
          `,
      })
    ).resolves.toMatchSnapshot()
  })

  it('returns all products with match in category', async () => {
    await expect(
      evaluate({
        query: `
            {
              searchProducts(searchString: "fruit") {
                nodes {
                  matches {
                    product {
                      pre
                      match
                      post
                    }
                    manufacturer {
                      pre
                      match
                      post
                    }
                    category {
                      pre
                      match
                      post
                    }
                  }
                  node {
                    slug
                    name
                  }
                }
              }
            }
          `,
      })
    ).resolves.toMatchSnapshot()
  })
})
