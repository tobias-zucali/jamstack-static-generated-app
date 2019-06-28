import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


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
          nodes: db.manufacturers.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: db.manufacturers.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: db.manufacturers.getByIndexLoop(0).slug,
            },
            last: {
              slug: db.manufacturers.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })
})
