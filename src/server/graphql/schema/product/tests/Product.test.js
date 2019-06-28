import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


const evaluateProduct = async ({
  product,
  nextProduct,
  previousProduct,
}) => {
  await expect(
    evaluate({
      query: `
        {
          product(slug: "${product.slug}") {
            slug
            name
            manufacturer {
              slug
            }
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
      product: {
        slug: product.slug,
        manufacturer: {
          slug: product.manufacturer,
        },
        name: product.name,
        edges: {
          next: nextProduct ? {
            slug: nextProduct.slug,
          } : null,
          previous: previousProduct ? {
            slug: previousProduct.slug,
          } : null,
        },
      },
    },
  })
}


describe('graphql/Product', () => {
  it('returns first product', async () => {
    await evaluateProduct({
      product: db.products.getByIndex(0),
      nextProduct: db.products.getByIndex(1),
    })
  })

  it('returns last product', async () => {
    await evaluateProduct({
      product: db.products.getByIndexLoop(-1),
      previousProduct: db.products.getByIndexLoop(-2),
    })
  })
})
