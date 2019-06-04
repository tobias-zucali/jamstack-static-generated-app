import Product, { allProductTypes } from './Product'
import Products from './Products'

export { default as queryFields } from './queryFields'
export const types = [
  ...allProductTypes,
  Products,
]
export default Product
