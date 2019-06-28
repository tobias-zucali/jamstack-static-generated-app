import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


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
      slug: db.productCategories.getByIndexLoop(0).slug,
      name: db.productCategories.getByIndexLoop(0).name,
      nextSlug: db.productCategories.getByIndexLoop(1).slug,
    })
  })
})
