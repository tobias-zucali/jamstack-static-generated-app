import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


describe('graphql/Products', () => {
  it('returns all products', async () => {
    await expect(
      evaluate({
        query: `
            {
              allProducts {
                nodes {
                  slug
                  name
                }
                totalCount
                edges {
                  first {
                    slug
                  }
                  last {
                    slug
                  }
                  next {
                    slug
                  }
                  previous {
                    slug
                  }
                }
              }
            }
          `,
      })
    ).resolves.toEqual({
      data: {
        allProducts: {
          nodes: db.products.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: db.products.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: db.products.getByIndexLoop(0).slug,
            },
            last: {
              slug: db.products.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })

  it('matches all products snapshot', async () => {
    await expect(
      evaluate({
        query: `
          {
            allProducts {
              nodes {
                name
                category {
                  name
                  slug
                  description
                }
                manufacturer {
                  address
                  description
                  name
                  slug
                }
                slug
                ... on Fruit {
                  vitamins
                }
                ... on Candy {
                  sugar
                }
              }
              totalCount
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot()
  })

  it('returns some products', async () => {
    await expect(
      evaluate({
        query: `
            {
              allProducts(after: "${db.products.getByIndexLoop(0).slug}", limit: 2) {
                nodes {
                  slug
                }
                totalCount
                edges {
                  first {
                    slug
                  }
                  last {
                    slug
                  }
                  next {
                    slug
                  }
                  previous {
                    slug
                  }
                }
              }
            }
          `,
      })
    ).resolves.toEqual({
      data: {
        allProducts: {
          nodes: [
            { slug: db.products.getByIndexLoop(1).slug },
            { slug: db.products.getByIndexLoop(2).slug },
          ],
          totalCount: db.products.getList().length,
          edges: {
            previous: {
              slug: db.products.getByIndexLoop(0).slug,
            },
            next: {
              slug: db.products.getByIndexLoop(3).slug,
            },
            first: {
              slug: db.products.getByIndexLoop(1).slug,
            },
            last: {
              slug: db.products.getByIndexLoop(2).slug,
            },
          },
        },
      },
    })
  })

  it('returns candy products', async () => {
    await expect(
      evaluate({
        query: `
            {
              allProducts(category: "candy", limit: 1) {
                nodes {
                  slug
                  category {
                    slug
                  }
                  ...on Candy {
                    sugar(unit: KG)
                  }
                }
              }
            }
          `,
      })
    ).resolves.toEqual({
      data: {
        allProducts: {
          nodes: [
            {
              slug: db.products.getByIndexLoop(1).slug,
              sugar: 0.005,
              category: {
                slug: 'candy',
              },
            },
          ],
        },
      },
    })
  })
})
