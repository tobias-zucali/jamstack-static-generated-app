import evaluate from '../../evaluate'

import { manufacturersDB } from '../../fakeDatabase'


describe('graphql/Manufacturers', () => {
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
          manufacturers: manufacturersDB.getList().map(({ slug, name }) => ({ slug, name })),
          count: manufacturersDB.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: manufacturersDB.getByIndexLoop(0).slug,
            },
            last: {
              slug: manufacturersDB.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })
})
