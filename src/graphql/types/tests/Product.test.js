import evaluate from '../../evaluate'

import { productsDB } from '../../fakeDatabase'


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


describe('graphql/Product', () => {
  it('returns first product', async () => {
    await evaluateProduct({
      slug: productsDB.getByIndexLoop(0).slug,
      name: productsDB.getByIndexLoop(0).name,
      nextSlug: productsDB.getByIndexLoop(1).slug,
    })
  })

  it('returns last product', async () => {
    await evaluateProduct({
      slug: productsDB.getByIndexLoop(-1).slug,
      name: productsDB.getByIndexLoop(-1).name,
      previousSlug: productsDB.getByIndexLoop(-2).slug,
    })
  })
})
