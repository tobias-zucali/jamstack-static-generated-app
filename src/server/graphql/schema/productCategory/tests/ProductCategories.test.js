import evaluate from 'server/graphql/evaluate'
import db from 'server/fakeDatabase'


describe('graphql/ProductCategories', () => {
  it('returns all productCategories', async () => {
    await expect(
      evaluate({
        query: `
            {
              allProductCategories {
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
        allProductCategories: {
          nodes: db.productCategories.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: db.productCategories.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: db.productCategories.getByIndexLoop(0).slug,
            },
            last: {
              slug: db.productCategories.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })
})
