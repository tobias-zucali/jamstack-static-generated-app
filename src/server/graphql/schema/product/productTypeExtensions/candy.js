import getWeightAttribute from '../getWeightAttribute'


export default {
  name: 'Candy',
  category: 'candy',
  additionalFields: {
    sugar: getWeightAttribute(),
  },
}
