import evaluate from '../../../evaluate'

import { productCategoriesDB } from '../../../fakeDatabase'


const evaluateProductCategory = async ({
  slug,
  name,
  nextSlug,
  previousSlug,
}) => {
  await expect(
    evaluate({
      query: `
        {
          productCategory(slug: "${slug}") {
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
      productCategory: {
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


describe('graphql/ProductCategory', () => {
  it('returns first productCategory', async () => {
    await evaluateProductCategory({
      slug: productCategoriesDB.getByIndexLoop(0).slug,
      name: productCategoriesDB.getByIndexLoop(0).name,
      nextSlug: productCategoriesDB.getByIndexLoop(1).slug,
    })
  })
})
