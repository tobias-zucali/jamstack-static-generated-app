import evaluate from '../../../evaluate'

import { productsDB } from '../../../fakeDatabase'


describe('graphql/Products', () => {
  it('returns all products', async () => {
    await expect(
      evaluate({
        query: `
            {
              allProducts {
                products {
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
          products: productsDB.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: productsDB.getList().length,
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
              allProducts(after: "${productsDB.getByIndexLoop(0).slug}", limit: 2) {
                products {
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
          products: [
            { slug: productsDB.getByIndexLoop(1).slug },
            { slug: productsDB.getByIndexLoop(2).slug },
          ],
          totalCount: productsDB.getList().length,
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
              allProducts(category: "candy", limit: 1) {
                products {
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
          products: [
            {
              slug: productsDB.getByIndexLoop(1).slug,
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
