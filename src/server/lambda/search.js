import FuzzySearch from 'fuzzy-search'

import { manufacturersDB, productsDB, productCategoriesDB } from 'server/fakeDatabase'


const entries = productsDB.getList().map(({ manufacturer, category, ...otherProps }) => ({
  ...otherProps,
  manufacturer: manufacturersDB.getBySlug(manufacturer),
  category: productCategoriesDB.getBySlug(category),
}))

const searcher = new FuzzySearch(entries, ['name', 'category.name', 'manufacturer.name'], {
  caseSensitive: false,
})


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
  return {
    statusCode: 200,
    body: JSON.stringify(searcher.search(searchString)),
  }
}
