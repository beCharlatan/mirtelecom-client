import React from 'react'
import cl from 'classnames'
import {Button, Card, Callout, Icon, Intent} from '@blueprintjs/core/lib/esm/index'
import LinkButton from "../../components/common/link-button"
import {Motion, spring} from "react-motion"
import SimpleMap from '../map/simple-map'

const EquipmentCard = ({data, remove, history, geocode}) => {
  const {equipment, address, status, note, name, sn, ip, id, geom} = data;
  console.log(geom, 'geom object')
  const coords = geom && JSON.parse(geom).coordinates.reverse();
  console.log(JSON.parse(geom), 'json')
  const handleDelete = (id, name, callback = null) => () => {
    if (window.confirm(`Вы действительно хотите удалить ${name}?`))
    return remove(id, callback)
  }
  const handleGeocode = obj => () => {
    geocode(obj)
    history.goBack()
  }
  return <div className="card">
    <div className="card__header">
        <h1 className="card__title">{name}</h1>
        <div className="card__actions">
            <LinkButton
                minimal
                to={`/equipment/update/${id}`}
                active="link--active">
                <Icon icon="edit" />
            </LinkButton>
            <Button 
              icon="path-search" 
              minimal
              onClick={handleGeocode({address: address, id: id})}
            />
            <Button 
              icon="trash" 
              minimal
              onClick={handleDelete(id, name, () => history.push('/'))}
            />
        </div>
    </div>
      <Motion defaultStyle={{x: -200, opacity: 0}} style={{x: spring(0), opacity: spring(1)}}>
          {style => (
              <Card elevation={2} className="card__info" style={{opacity: style.opacity, transform: `translateX(${style.x}px)`}}>
                  <h3 className="card__tag">Информация</h3>
                  <ul className="card-list">
                    <li className="card-list__item">
                      <i>Оборудование: </i><span className="card-list__value">{equipment}</span>
                    </li>
                    <li className="card-list__item">
                      <i>Статус: </i><span
                        className={cl('card-list__value', {
                          'card-list__value--blue': status === "MTK" || status === "МТК",
                          'card-list__value--red': status === "ЭК" || status === "EK"
                        })}>{status}</span>
                    </li>
                    <li className="card-list__item">
                      <i>IP адрес: </i><span className="card-list__value">{ip}</span>
                    </li>
                    <li className="card-list__item">
                      <i>Сер. номер: </i><span className="card-list__value">{sn}</span>
                    </li>
                    <li className="card-list__item">
                      <i>Примечание: </i><span className="card-list__value">{note}</span>
                    </li>
                  </ul>
              </Card>
          )}</Motion>
      <Motion defaultStyle={{x: 200, opacity: 0}} style={{x: spring(0), opacity: spring(1)}}>
          {style => (
              <Card elevation={2} className="card__geo" style={{opacity: style.opacity, transform: `translateX(${style.x}px)`}}>
                  <h3 className="card__tag">География</h3>
                  <address className="card-address"><Icon icon="map-marker"/> {address}</address>
                  <SimpleMap position={coords} id={id} />
              </Card>
          )}</Motion>
      <Motion defaultStyle={{x: -200, opacity: 0}} style={{x: spring(0), opacity: spring(1)}}>
          {style => (
              <Card elevation={2} className="card__cfg" style={{opacity: style.opacity, transform: `translateX(${style.x}px)`}}>
                  <h3 className="card__tag">Файл конфигурации</h3>
                  {name && <Callout>
                    <iframe
                      className="card__cfg-text"
                      title={`Файл конфигурации ${name}`}
                      src={`http://172.16.13.250/cisconfig/${name}.txt`} 
                      frameBorder="0"
                    />
                  </Callout>}
              </Card>
          )}</Motion>
    <Button
      className="mt-2"
      intent={Intent.DANGER}
      fill
      onClick={handleDelete(id, name, () => history.push('/'))}
      text="Удалить"/>
  </div>
}

export default EquipmentCard