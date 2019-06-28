import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


const evaluateManufacturer = async ({
  slug,
  name,
  nextSlug,
  previousSlug,
}) => {
  await expect(
    evaluate({
      query: `
        {
          manufacturer(slug: "${slug}") {
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
      manufacturer: {
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


describe('graphql/Manufacturer', () => {
  it('returns first manufacturer', async () => {
    await evaluateManufacturer({
      slug: db.manufacturers.getByIndexLoop(0).slug,
      name: db.manufacturers.getByIndexLoop(0).name,
      nextSlug: db.manufacturers.getByIndexLoop(1).slug,
    })
  })
})
