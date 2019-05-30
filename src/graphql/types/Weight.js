const {
  GraphQLEnumType,
} = require('graphql')


const WEIGHT_UNITS = {
  G: 1,
  DAG: 10,
  KG: 1000,
  T: 1000000,
}
const Weight = new GraphQLEnumType({
  name: 'weight',
  values: Object.keys(WEIGHT_UNITS).reduce((values, key) => ({
    [key]: { value: WEIGHT_UNITS[key] },
    ...values,
  }), {}),
})

const convertWeight = (value, unit, defaultUnit) => value / unit * defaultUnit

module.exports = {
  WEIGHT_UNITS,
  Weight,
  convertWeight,
}
