const evaluate = require('../evaluate')

const {
  getProductByIndexLoop,
  getProducts,
} = require('../fakeDatabase/index.js')


const evaluateProduct = async ({
  id,
  name,
  nextId,
  previousId,
}) => {
  await expect(
    evaluate({
      query: `
        {
          getProduct(id: "${id}") {
            id
            name
            edges {
              previous {
                id
              }
              next {
                id
              }
            }
          }
        }
      `,
    })
  ).resolves.toEqual({
    data: {
      getProduct: {
        id,
        name,
        edges: {
          next: nextId ? {
            id: nextId,
          } : null,
          previous: previousId ? {
            id: previousId,
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
        id: getProductByIndexLoop(0).id,
        name: getProductByIndexLoop(0).name,
        nextId: getProductByIndexLoop(1).id,
      })
    })

    it('returns last product', async () => {
      await evaluateProduct({
        id: getProductByIndexLoop(-1).id,
        name: getProductByIndexLoop(-1).name,
        previousId: getProductByIndexLoop(-2).id,
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
                  id
                  name
                }
                count
                edges {
                  first {
                    id
                  }
                  last {
                    id
                  }
                  next {
                    id
                  }
                  previous {
                    id
                  }
                }
              }
            }
          `,
        })
      ).resolves.toEqual({
        data: {
          getProducts: {
            products: getProducts().map(({ id, name }) => ({ id, name })),
            count: getProducts().length,
            edges: {
              next: null,
              previous: null,
              first: {
                id: getProductByIndexLoop(0).id,
              },
              last: {
                id: getProductByIndexLoop(-1).id,
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
              getProducts(after: "${getProductByIndexLoop(0).id}", limit: 2) {
                products {
                  id
                }
                count
                edges {
                  first {
                    id
                  }
                  last {
                    id
                  }
                  next {
                    id
                  }
                  previous {
                    id
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
              { id: getProductByIndexLoop(1).id },
              { id: getProductByIndexLoop(2).id },
            ],
            count: 2,
            edges: {
              previous: {
                id: getProductByIndexLoop(0).id,
              },
              next: {
                id: getProductByIndexLoop(3).id,
              },
              first: {
                id: getProductByIndexLoop(1).id,
              },
              last: {
                id: getProductByIndexLoop(2).id,
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
                  id
                  type
                  ...on CandyProduct {
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
                id: 'b',
                sugar: 0.005,
                type: 'CandyProduct',
              },
            ],
          },
        },
      })
    })
  })
})
