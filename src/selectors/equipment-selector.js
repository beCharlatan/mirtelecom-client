import {createSelector} from 'reselect'
import {lazyFilter} from '../utils'

export const equipmentData = state => state.equipment.data
export const filterArray = state => state.equipment.filter

export const equipmentSelector = createSelector(
  [equipmentData, filterArray],
  (data, filter) => lazyFilter(data, filter)
)