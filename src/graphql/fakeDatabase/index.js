
const {
  offers: fakeOffers,
  manufacturer: fakeManufacturers,
} = require('./data.json')

exports.getOffers = () => fakeOffers
exports.getOfferById = (id) => fakeOffers.find((entry) => entry.id === id)
exports.getOfferIndex = (offer) => fakeOffers.indexOf(offer)
exports.getOfferByIndex = (index) => fakeOffers[index]
exports.getOfferByIndexLoop = (index) => {
  let positiveIndex = index % fakeOffers.length
  while (positiveIndex < 0) {
    positiveIndex += fakeOffers.length
  }
  return fakeOffers[positiveIndex]
}

exports.getManufacturerById = (id) => fakeManufacturers.find((entry) => entry.id === id)
