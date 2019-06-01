import evaluate from '../../evaluate'

import { productsDB } from '../../fakeDatabase'


describe('graphql/Products', () => {
  it('returns all products', async () => {
    await expect(
      evaluate({
        query: `
            {
              getProducts {
                products {
                  slug
                  name
                }
                count
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
        getProducts: {
          products: productsDB.getList().map(({ slug, name }) => ({ slug, name })),
          count: productsDB.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: productsDB.getByIndexLoop(0).slug,
            },
            last: {
              slug: productsDB.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })

  it('returns some products', async () => {
    await expect(
      evaluate({
        query: `
            {
              getProducts(after: "${productsDB.getByIndexLoop(0).slug}", limit: 2) {
                products {
                  slug
                }
                count
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
        getProducts: {
          products: [
            { slug: productsDB.getByIndexLoop(1).slug },
            { slug: productsDB.getByIndexLoop(2).slug },
          ],
          count: 2,
          edges: {
            previous: {
              slug: productsDB.getByIndexLoop(0).slug,
            },
            next: {
              slug: productsDB.getByIndexLoop(3).slug,
            },
            first: {
              slug: productsDB.getByIndexLoop(1).slug,
            },
            last: {
              slug: productsDB.getByIndexLoop(2).slug,
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
              getProducts(type: CANDY, limit: 1) {
                products {
                  slug
                  type
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
        getProducts: {
          products: [
            {
              slug: productsDB.getByIndexLoop(1).slug,
              sugar: 0.005,
              type: 'Candy',
            },
          ],
        },
      },
    })
  })
})
