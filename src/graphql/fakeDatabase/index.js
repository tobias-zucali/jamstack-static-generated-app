
const {
  products: fakeProducts,
  manufacturer: fakeManufacturers,
} = require('./data.json')

exports.getProducts = () => fakeProducts
exports.getProductById = (id) => fakeProducts.find((entry) => entry.id === id)
exports.getProductIndex = (product) => fakeProducts.indexOf(product)
exports.getProductByIndex = (index) => fakeProducts[index]
exports.getProductByIndexLoop = (index) => {
  let positiveIndex = index % fakeProducts.length
  while (positiveIndex < 0) {
    positiveIndex += fakeProducts.length
  }
  return fakeProducts[positiveIndex]
}

exports.getManufacturerById = (id) => fakeManufacturers.find((entry) => entry.id === id)
