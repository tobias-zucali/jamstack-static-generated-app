import { manufacturersDB, productsDB, productCategoriesDB } from 'server/fakeDatabase'


const allProducts = productsDB.getList().map(({ manufacturer, category, ...otherProps }) => ({
  ...otherProps,
  manufacturer: manufacturersDB.getBySlug(manufacturer),
  category: productCategoriesDB.getBySlug(category),
}))

const getMatches = (string, searchString) => {
  const lowerCaseString = string.toLowerCase()
  const lowerCaseSearchString = searchString.toLowerCase()
  const index = lowerCaseString.indexOf(lowerCaseSearchString)
  if (index === -1) {
    return null
  }
  return {
    pre: string.substr(0, index),
    match: string.substr(index, searchString.length),
    post: string.substr(index + searchString.length),
  }
}

export async function handler({ queryStringParameters }) {
  const {
    q: searchString,
  } = queryStringParameters
  if (searchString === undefined) {
    return {
      statusCode: 422,
      body: 'Error: missing search string (url parameter `q`)',
    }
  }
  const matchedProducts = allProducts.reduce(
    (accumulator, product) => {
      const matches = {
        product: getMatches(product.name, searchString),
        manufacturer: getMatches(product.manufacturer.name, searchString),
        category: getMatches(product.category.name, searchString),
      }
      if (matches.product || matches.manufacturer || matches.category) {
        return [
          ...accumulator,
          {
            matches,
            product,
          },
        ]
      } else {
        return accumulator
      }
    },
    []
  )
  return {
    statusCode: 200,
    body: JSON.stringify(matchedProducts),
  }
}
