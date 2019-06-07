import Product, { allProductTypes } from './Product'
import Products from './Products'
import ProductSearchResult from './ProductSearchResult'
import ProductSearchResults from './ProductSearchResults'

export { default as queryFields } from './queryFields'
export const types = [
  ...allProductTypes,
  Products,
  ProductSearchResult,
  ProductSearchResults,
]
export default Product
