
import {
  products as fakeProducts,
  manufacturer as fakeManufacturers,
} from './data.json'

export const getProducts = () => fakeProducts
export const getProductBySlug = (slug) => fakeProducts.find((entry) => entry.slug === slug)
export const getProductIndex = (product) => fakeProducts.indexOf(product)
export const getProductByIndex = (index) => fakeProducts[index]
export const getProductByIndexLoop = (index) => {
  let positiveIndex = index % fakeProducts.length
  while (positiveIndex < 0) {
    positiveIndex += fakeProducts.length
  }
  return fakeProducts[positiveIndex]
}


export const getManufacturers = () => fakeManufacturers
export const getManufacturerBySlug = (slug) => fakeManufacturers.find((entry) => entry.slug === slug)
export const getManufacturerIndex = (manufacturer) => fakeManufacturers.indexOf(manufacturer)
export const getManufacturerByIndex = (index) => fakeManufacturers[index]
export const getManufacturerByIndexLoop = (index) => {
  let positiveIndex = index % fakeManufacturers.length
  while (positiveIndex < 0) {
    positiveIndex += fakeManufacturers.length
  }
  return fakeManufacturers[positiveIndex]
}
