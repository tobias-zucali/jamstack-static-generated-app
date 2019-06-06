import uniqueId from 'lodash/uniqueId'
import { useMemo } from 'react'

export default function useUniqueId(prefix = '') {
  return useMemo(
    () => `${prefix}${prefix ? '_' : ''}${uniqueId()}`,
    [prefix]
  )
}
