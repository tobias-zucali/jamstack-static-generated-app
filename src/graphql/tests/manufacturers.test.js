import evaluate from '../evaluate'

import {
  getManufacturerByIndexLoop,
  getManufacturers,
} from '../fakeDatabase'


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
          getManufacturer(slug: "${slug}") {
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
      getManufacturer: {
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
  describe('Manufacturer', () => {
    it('returns first manufacturer', async () => {
      await evaluateManufacturer({
        slug: getManufacturerByIndexLoop(0).slug,
        name: getManufacturerByIndexLoop(0).name,
        nextSlug: getManufacturerByIndexLoop(1).slug,
      })
    })
  })

  describe('Manufacturers', () => {
    it('returns all manufacturers', async () => {
      await expect(
        evaluate({
          query: `
            {
              getManufacturers {
                manufacturers {
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
          getManufacturers: {
            manufacturers: getManufacturers().map(({ slug, name }) => ({ slug, name })),
            count: getManufacturers().length,
            edges: {
              next: null,
              previous: null,
              first: {
                slug: getManufacturerByIndexLoop(0).slug,
              },
              last: {
                slug: getManufacturerByIndexLoop(-1).slug,
              },
            },
          },
        },
      })
    })
  })
})
