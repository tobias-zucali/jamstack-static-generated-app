const evaluate = require('../evaluate')
const fakeDatabase = require('../fake-database.json')

const firstFake = fakeDatabase[0]
const secondFake = fakeDatabase[1]
const thirdFake = fakeDatabase[2]
const fourthFake = fakeDatabase[3]
const lastFake = fakeDatabase[fakeDatabase.length - 1]
const penultimateFake = fakeDatabase[fakeDatabase.length - 2]


const evaluateOffer = async ({
  id,
  title,
  nextId,
  previousId,
}) => {
  await expect(
    evaluate({
      query: `
        {
          getOffer(id: "${id}") {
            id
            title
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
        title,
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
  describe('Offer', () => {
    it('returns first offer', async () => {
      await evaluateOffer({
        id: firstFake.id,
        title: firstFake.title,
        nextId: secondFake.id,
      })
    })

    it('returns last offer', async () => {
      await evaluateOffer({
        id: lastFake.id,
        title: lastFake.title,
        previousId: penultimateFake.id,
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
                  title
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
            offers: fakeDatabase.map(({ id, title }) => ({ id, title })),
            cursors: {
              count: fakeDatabase.length,
              next: null,
              previous: null,
              first: {
                id: firstFake.id,
              },
              last: {
                id: lastFake.id,
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
              getOffers(cursor: "${firstFake.id}", limit: 2) {
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
              { id: secondFake.id },
              { id: thirdFake.id },
            ],
            cursors: {
              count: 2,
              previous: {
                id: firstFake.id,
              },
              next: {
                id: fourthFake.id,
              },
              first: {
                id: secondFake.id,
              },
              last: {
                id: thirdFake.id,
              },
            },
          },
        },
      })
    })
  })
})
