import React from 'react'
import {connect} from 'react-redux'
import LinkButton from '../common/link-button'
import {filterEquipment} from '../../store/equipment'
import {TagInput, Button, Intent} from '@blueprintjs/core'

const Filter = ({filter, load, error, filterEquipment}) => {

  const _filter = (arr) => () => {
    if (arr.join('') !== filter.join('')) return filterEquipment(arr)
    return false
  }
  
  const clearButton = (
    <Button
      title="Очистить фильтр"
      icon='cross'
      minimal={true}
      onClick={_filter([])}
    />
  );

  return (
    <div className="filter-control">
      <TagInput
        className='filter-control__input'
        leftIcon='search'
        placeholder='Вы что-то ищите?..'
        values={filter}
        rightElement={clearButton}
        onChange={(values) => {
          filterEquipment(values)
        }}    
      />
      <LinkButton
        className="ml1"
        title="Добавить элемент"
        to="/equipment/create"
        disabled={load || error}
        intent={Intent.SUCCESS}
        icon="plus" />
    </div>
  )
};

const mapStateToProps = ({equipment: {filter, load}}) => {
  return {filter, load}
}

export default connect(mapStateToProps, {filterEquipment})(Filter);