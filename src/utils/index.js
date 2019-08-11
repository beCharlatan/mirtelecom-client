import * as R from 'ramda';

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const compose = (...funcs) => (comp) => {
  return funcs.reduceRight(
    (wrapped, f) => f(wrapped), comp);
};

const sortByProp = prop => (
  R.sortBy(R.compose(
    R.toLower, 
    R.prop(prop)
  ))
);

const sort = ({sortBy, sortDirection}, list) => {
  const sortedListByProp = sortByProp(sortBy)(list);
  return sortDirection === 'DESC' ? sortedListByProp : sortedListByProp.reverse();
};

const getUnique = (arr, prop) => {
  const result = R.uniq(R.pluck(prop, arr))
    .filter(i => i.length > 0)
    .sort()
  return result
};

const _getStringOfValues = (obj) => {
  let str = ''
  Object.values(obj).map(i => {
    if (typeof i === 'string') {
      str += i.toLowerCase()
    }
  })
  return str
};

const _checkFilterInputs = (str, filter) => {
  for (var i = filter.length - 1; i >= 0; i--) {
    if (str.indexOf(filter[i].toLowerCase()) === -1) return false
  }
  return true
};

const lazyFilter = (data, filter) => {
  return data.filter(item => _checkFilterInputs(
    _getStringOfValues(item), 
    filter
  ));
};

export {
  compose,
  sort,
  getUnique,
  lazyFilter,
  composeValidators
}