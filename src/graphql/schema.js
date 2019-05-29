const { buildSchema } = require('graphql')
const fakeDatabase = require('./fake-database.json')

const schema = buildSchema(`
  type Query {
    getOffers(cursor: ID, limit: Int): Offers!
    getOffer(id: ID!): Offer
  }

  type Offer {
    cursors: OfferCursors!
    id: ID!
    title: String!
  }

  type Offers {
    cursors: OfferCursors!
    cursor: ID
    limit: Int
    offers: [Offer]
  }

  type OfferCursors {
    count: Int
    first: Offer
    last: Offer
    next: Offer
    previous: Offer
  }
`)

class Offer {
  constructor(id, { title }) {
    this.id = id
    this.title = title
  }

  get cursors() {
    return {
      count: null,
      first: null,
      last: null,
      ...getNextPrevOffer(this),
    }
  }
}

class Offers {
  constructor({ cursor, limit }) {
    this.cursor = cursor
    this.limit = limit
  }

  get offers() {
    let offers = allOffers
    if (this.cursor) {
      const cursorOffer = getOfferById(this.cursor)
      if (cursorOffer) {
        const cursorIndex = allOffers.indexOf(cursorOffer)
        offers = allOffers.slice(cursorIndex + 1)
      }
    }
    if (this.limit) {
      offers = offers.slice(0, this.limit)
    }
    return offers
  }

  get cursors() {
    const { offers } = this
    const first = offers[0]
    const count = offers.length
    const last = offers[offers.length - 1]

    return {
      count,
      first,
      last,
      get next() {
        return last && last.cursors.next
      },
      get previous() {
        return first && first.cursors.previous
      },
    }
  }
}

const allOffers = fakeDatabase.map(({ id, props }) => new Offer(
  id,
  props
))

const getOfferById = (id) => allOffers.find((offer) => offer.id === id)

const getNextPrevOffer = (offer) => {
  const index = allOffers.indexOf(offer)
  const nextRaw = allOffers[index + 1]
  const previousRaw = allOffers[index + 1]

  return {
    next: nextRaw && getOfferById(nextRaw.id),
    previous: previousRaw && getOfferById(previousRaw.id),
  }
}

const root = {
  getOffer({ id }) {
    return getOfferById(id)
  },
  getOffers({ cursor, limit }) {
    return new Offers({ cursor, limit })
  },
}

module.exports = {
  schema,
  root,
}
