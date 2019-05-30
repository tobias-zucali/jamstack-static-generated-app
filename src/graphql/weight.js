const {
  GraphQLEnumType,
} = require('graphql')


const weightUnits = {
  g: 1,
  dag: 10,
  kg: 1000,
  t: 1000000,
}
exports.WeightType = new GraphQLEnumType({
  name: 'weight',
  values: Object.keys(weightUnits).reduce((values, unit) => ({
    [unit.toUpperCase()]: weightUnits,
    ...values,
  }), {}),
})

exports.convertWeight = (value, unit, defaultUnit = 'g') => value / weightUnits[defaultUnit] * weightUnits[unit]
