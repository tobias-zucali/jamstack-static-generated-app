import evaluate from '../../../evaluate'

import { productCategoriesDB } from '../../../fakeDatabase'


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
          nodes: productCategoriesDB.getList().map(({ slug, name }) => ({ slug, name })),
          totalCount: productCategoriesDB.getList().length,
          edges: {
            next: null,
            previous: null,
            first: {
              slug: productCategoriesDB.getByIndexLoop(0).slug,
            },
            last: {
              slug: productCategoriesDB.getByIndexLoop(-1).slug,
            },
          },
        },
      },
    })
  })
})
