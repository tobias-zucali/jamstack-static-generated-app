import {
  GraphQLEnumType,
} from 'graphql'


export const WEIGHT_UNITS = {
  G: 1,
  DAG: 10,
  KG: 1000,
  T: 1000000,
}
export const Weight = new GraphQLEnumType({
  name: 'weight',
  values: Object.keys(WEIGHT_UNITS).reduce((values, key) => ({
    [key]: { value: WEIGHT_UNITS[key] },
    ...values,
  }), {}),
})

export const convertWeight = (value, unit, defaultUnit) => value / unit * defaultUnit
