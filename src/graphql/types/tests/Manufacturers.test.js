import evaluate from '../../evaluate'

import { manufacturersDB } from '../../fakeDatabase'


describe('graphql/Manufacturers', () => {
  it('returns all manufacturers', async () => {
    await expect(
      evaluate({
        query: `
            {
              allManufacturers {
                nodes {
                  slug
                  name
                }
                totalCount
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
        allManufacturers: {
          nodes: manufacturersDB.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: manufacturersDB.getList().length,
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
