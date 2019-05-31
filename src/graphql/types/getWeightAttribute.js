import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql'

export const WEIGHT_UNITS = {
  G: 1,
  DAG: 10,
  KG: 1000,
  T: 1000000,
}

export const convertWeight = (value, unit, defaultUnit) => value / unit * defaultUnit

export const WeightUnit = new GraphQLEnumType({
  name: 'weight',
  values: Object.keys(WEIGHT_UNITS).reduce((values, key) => ({
    [key]: { value: WEIGHT_UNITS[key] },
    ...values,
  }), {}),
})

export default function getWeightAttribute(defaultValue = WEIGHT_UNITS.G) {
  return {
    type: new GraphQLNonNull(GraphQLFloat),
    args: {
      unit: {
        type: WeightUnit,
        defaultValue,
      },
    },
    resolve({ sugar }, { unit }) {
      return convertWeight(sugar, unit, WEIGHT_UNITS.G)
    },
  }
}
