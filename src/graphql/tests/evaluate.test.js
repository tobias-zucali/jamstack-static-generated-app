const evaluate = require('../evaluate')
const fakeDatabase = require('../fake-database.json')

const { offers: fakeOffers } = fakeDatabase
const firstFakeOffer = fakeOffers[0]
const secondFakeOffer = fakeOffers[1]
const thirdFakeOffer = fakeOffers[2]
const fourthFakeOffer = fakeOffers[3]
const lastFakeOffer = fakeOffers[fakeOffers.length - 1]
const penultimateFakeOffer = fakeOffers[fakeOffers.length - 2]


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
    it.only('returns first offer', async () => {
      await evaluateOffer({
        id: firstFakeOffer.id,
        name: firstFakeOffer.name,
        nextId: secondFakeOffer.id,
      })
    })

    it('returns last offer', async () => {
      await evaluateOffer({
        id: lastFakeOffer.id,
        name: lastFakeOffer.name,
        previousId: penultimateFakeOffer.id,
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
            offers: fakeOffers.map(({ id, name }) => ({ id, name })),
            cursors: {
              count: fakeOffers.length,
              next: null,
              previous: null,
              first: {
                id: firstFakeOffer.id,
              },
              last: {
                id: lastFakeOffer.id,
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
              getOffers(after: "${firstFakeOffer.id}", limit: 2) {
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
              { id: secondFakeOffer.id },
              { id: thirdFakeOffer.id },
            ],
            cursors: {
              count: 2,
              previous: {
                id: firstFakeOffer.id,
              },
              next: {
                id: fourthFakeOffer.id,
              },
              first: {
                id: secondFakeOffer.id,
              },
              last: {
                id: thirdFakeOffer.id,
              },
            },
          },
        },
      })
    })
  })
})
