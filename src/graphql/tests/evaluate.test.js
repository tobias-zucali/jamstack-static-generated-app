import evaluate from '../evaluate'

import {
  getProductByIndexLoop,
  getProducts,
} from '../fakeDatabase'


const evaluateProduct = async ({
  slug,
  name,
  nextSlug,
  previousSlug,
}) => {
  await expect(
    evaluate({
      query: `
        {
          getProduct(slug: "${slug}") {
            slug
            name
            edges {
              previous {
                slug
              }
              next {
                slug
              }
            }
          }
        }
      `,
    })
  ).resolves.toEqual({
    data: {
      getProduct: {
        slug,
        name,
        edges: {
          next: nextSlug ? {
            slug: nextSlug,
          } : null,
          previous: previousSlug ? {
            slug: previousSlug,
          } : null,
        },
      },
    },
  })
}


describe('graphql/evaluate', () => {
  describe('Product', () => {
    it('returns first product', async () => {
      await evaluateProduct({
        slug: getProductByIndexLoop(0).slug,
        name: getProductByIndexLoop(0).name,
        nextSlug: getProductByIndexLoop(1).slug,
      })
    })

    it('returns last product', async () => {
      await evaluateProduct({
        slug: getProductByIndexLoop(-1).slug,
        name: getProductByIndexLoop(-1).name,
        previousSlug: getProductByIndexLoop(-2).slug,
      })
    })
  })

  describe('Products', () => {
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
            products: getProducts().map(({ slug, name }) => ({ slug, name })),
            count: getProducts().length,
            edges: {
              next: null,
              previous: null,
              first: {
                slug: getProductByIndexLoop(0).slug,
              },
              last: {
                slug: getProductByIndexLoop(-1).slug,
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
              getProducts(after: "${getProductByIndexLoop(0).slug}", limit: 2) {
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
              { slug: getProductByIndexLoop(1).slug },
              { slug: getProductByIndexLoop(2).slug },
            ],
            count: 2,
            edges: {
              previous: {
                slug: getProductByIndexLoop(0).slug,
              },
              next: {
                slug: getProductByIndexLoop(3).slug,
              },
              first: {
                slug: getProductByIndexLoop(1).slug,
              },
              last: {
                slug: getProductByIndexLoop(2).slug,
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
                slug: getProductByIndexLoop(1).slug,
                sugar: 0.005,
                type: 'Candy',
              },
            ],
          },
        },
      })
    })
  })
})
