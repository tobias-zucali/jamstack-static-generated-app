import evaluate from '../../evaluate'

import { manufacturersDB } from '../../fakeDatabase'


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
      slug: manufacturersDB.getByIndexLoop(0).slug,
      name: manufacturersDB.getByIndexLoop(0).name,
      nextSlug: manufacturersDB.getByIndexLoop(1).slug,
    })
  })
})
