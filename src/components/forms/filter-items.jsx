import React from 'react';
import {connect} from 'react-redux';
import LinkButton from '../common/link-button'
import {filterEquipment} from '../../redux';
import {TagInput, Button, Intent} from '@blueprintjs/core';

const Filter = ({filter, load, error, filterEquipment}) => {
  
  const clearButton = (
    <Button
      title="Очистить фильтр"
      icon='cross'
      minimal={true}
      onClick={() => filterEquipment([])}
    />
  );

  return (
    <div className="filter-control">
      <TagInput
        className='filter-control__input'
        leftIcon='search'
        placeholder='Вы что-то искали?..'
        values={filter}
        rightElement={clearButton}
        onChange={(values) => filterEquipment(values)}    
      />
      <LinkButton
        title="Добавить элемент"
        to="/equipment/create"
        disabled={load || error}
        className="btn btn--green filter-control__btn"
        intent={Intent.SUCCESS}
        icon="plus"
        large />
    </div>
  )
};

const mapStateToProps = ({equipment: {filter, load, error}}) => {
  return {filter, load};
}

const mapDispatchToProps = {
  filterEquipment: filterEquipment
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);