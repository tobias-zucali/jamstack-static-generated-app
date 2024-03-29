
import {
  products as fakeProducts,
  manufacturer as fakeManufacturers,
  productCategories as fakeProductCategories,
} from './data.json'

const getAccessLayer = (data) => ({
  getList({ after, filterCallback, limit } = {}) {
    let result = data
    if (after) {
      const previousEntry = this.getBySlug(after)
      const previousIndex = this.getIndex(previousEntry)
      result = result.slice(previousIndex + 1)
    }
    if (filterCallback) {
      result = result.filter(filterCallback)
    }
    if (limit) {
      result = result.slice(0, limit)
    }
    return result
  },
  getBySlug(slug) {
    return data.find((entry) => entry.slug === slug)
  },
  getByIndex(index) {
    return data[index]
  },
  getByIndexLoop(index) {
    let correctedIndex = index % data.length
    while (correctedIndex < 0) {
      correctedIndex += data.length
    }
    return data[correctedIndex]
  },
  getIndex(entry) {
    return data.indexOf(entry)
  },
  getNext(entry) {
    return this.getByIndex(
      this.getIndex(entry) + 1
    )
  },
  getPrevious(entry) {
    return this.getByIndex(
      this.getIndex(entry) - 1
    )
  },
})

export default {
  manufacturers: getAccessLayer(fakeManufacturers),
  products: getAccessLayer(fakeProducts),
  productCategories: getAccessLayer(fakeProductCategories),
}
