
const {
  products: fakeProducts,
  manufacturer: fakeManufacturers,
} = require('./data.json')

exports.getProducts = () => fakeProducts
exports.getProductBySlug = (slug) => fakeProducts.find((entry) => entry.slug === slug)
exports.getProductIndex = (product) => fakeProducts.indexOf(product)
exports.getProductByIndex = (index) => fakeProducts[index]
exports.getProductByIndexLoop = (index) => {
  let positiveIndex = index % fakeProducts.length
  while (positiveIndex < 0) {
    positiveIndex += fakeProducts.length
  }
  return fakeProducts[positiveIndex]
}

exports.getManufacturerBySlug = (slug) => fakeManufacturers.find((entry) => entry.slug === slug)
