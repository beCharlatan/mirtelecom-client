import React from 'react'
import withOptions from '../../HOC/with-options'
import {
  Button,
  Card
} from "@blueprintjs/core"
import EquipmentStatistics from '../../components/statistics-bar/equipment-statistics'
import ErrorMessage from '../../components/error/error-message'

export const NoData = <ErrorMessage
  icon="issue"
  title="Нет данных"
  desc="По данным выборки объектов найдено не было"
/>

const EquipmentList = ({data, remove, scrollTo, changeOptions, history}) => {

  const deleteItem = (id, name) => () => {
    if (window.confirm(`Вы действительно хотите удалить ${name}?`))
      return remove(id)
  }

  const goToMarker = data => () => {
    if (data.geom) {
      scrollTo('#primary-map', {speed: 1800, easing: 'easeOutCubic'})
      changeOptions({
        options: {
          selectedItem: data.id
        },
        optionsType: 'map'
      })   
    }
  }

  const goToDetailedPage = id => () => history.push(`/equipments/${id}`)
  const goToEditPage = id => () => history.push(`/equipment/update/${id}`)

  if (data.length === 0) return NoData

  return <React.Fragment>
    <EquipmentStatistics data={data} />
    <div className="list-container">
      {data.map((i, idx) => <Card 
        key={idx} 
        interactive={true} 
        className="list-item">
        <div className="list-item__content" onClick={goToDetailedPage(i.id)}>
          <h3>{i.name}</h3>
          <p>{i.address}</p>
          <p>{i.equipment}</p>
        </div>
        <div className="list-item__action">
          <Button
            title="Изменить данные"
            minimal
            icon="edit"
            onClick={goToEditPage(i.id)}
          />
          <Button
            title="Показать на карте"
            minimal
            icon="map-marker"
            onClick={goToMarker(i)}
          />
          <Button
            className="btn btn--default"
            title="Удалить элемент"
            icon="trash"
            onClick={deleteItem(i.id, i.name)}
          />
        </div>  
      </Card>)}
    </div>
  </React.Fragment>
}

export default withOptions('map')(EquipmentList)