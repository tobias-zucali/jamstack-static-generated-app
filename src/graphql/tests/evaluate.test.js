const evaluate = require('../evaluate')

const {
  getOfferByIndexLoop,
  getOffers,
} = require('../fakeDatabase/index.js')


const evaluateOffer = async ({
  id,
  name,
  nextId,
  previousId,
}) => {
  await expect(
    evaluate({
      query: `
        {
          getOffer(id: "${id}") {
            id
            name
            cursors {
              previous {
                id
              }
              next {
                id
              }
            }
          }
        }
      `,
    })
  ).resolves.toEqual({
    data: {
      getOffer: {
        id,
        name,
        cursors: {
          next: nextId ? {
            id: nextId,
          } : null,
          previous: previousId ? {
            id: previousId,
          } : null,
        },
      },
    },
  })
}


describe('graphql/evaluate', () => {
  describe.only('Offer', () => {
    it('returns first offer', async () => {
      await evaluateOffer({
        id: getOfferByIndexLoop(0).id,
        name: getOfferByIndexLoop(0).name,
        nextId: getOfferByIndexLoop(1).id,
      })
    })

    it('returns last offer', async () => {
      await evaluateOffer({
        id: getOfferByIndexLoop(-1).id,
        name: getOfferByIndexLoop(-1).name,
        previousId: getOfferByIndexLoop(-2).id,
      })
    })
  })

  describe('Offers', () => {
    it('returns all offers', async () => {
      await expect(
        evaluate({
          query: `
            {
              getOffers {
                offers {
                  id
                  name
                }
                cursors {
                  count
                  first {
                    id
                  }
                  last {
                    id
                  }
                  next {
                    id
                  }
                  previous {
                    id
                  }
                }
              }
            }
          `,
        })
      ).resolves.toEqual({
        data: {
          getOffers: {
            offers: getOffers().map(({ id, name }) => ({ id, name })),
            cursors: {
              count: getOffers().length,
              next: null,
              previous: null,
              first: {
                id: getOfferByIndexLoop(0).id,
              },
              last: {
                id: getOfferByIndexLoop(-1).id + 12,
              },
            },
          },
        },
      })
    })

    it('returns some offers', async () => {
      await expect(
        evaluate({
          query: `
            {
              getOffers(after: "${getOfferByIndexLoop(0).id}", limit: 2) {
                offers {
                  id
                }
                cursors {
                  count
                  first {
                    id
                  }
                  last {
                    id
                  }
                  next {
                    id
                  }
                  previous {
                    id
                  }
                }
              }
            }
          `,
        })
      ).resolves.toEqual({
        data: {
          getOffers: {
            offers: [
              { id: getOfferByIndexLoop(1).id },
              { id: getOfferByIndexLoop(2).id },
            ],
            cursors: {
              count: 2,
              previous: {
                id: getOfferByIndexLoop(0).id,
              },
              next: {
                id: getOfferByIndexLoop(3).id,
              },
              first: {
                id: getOfferByIndexLoop(1).id,
              },
              last: {
                id: getOfferByIndexLoop(2).id,
              },
            },
          },
        },
      })
    })
  })
})
