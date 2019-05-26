import React from 'react'
import cl from 'classnames'
import {Button, Card, Intent, Callout, Icon} from '@blueprintjs/core/lib/esm/index'
import NavLinkButton from "../common/nav-link-button"
import {Motion, spring} from "react-motion"
import SimpleMap from '../map/simple-map'

const EquipmentCard = ({data, remove, history}) => {
    const {equipment, address, status, note, name, sn, ip, id, geom} = data
    const coords = geom && JSON.parse(geom).coordinates.reverse()
    return <div className="card">
      <div className="card__header">
          <h1 className="card__title">{name}</h1>
          <div className="card__actions">
              <NavLinkButton
                  minimal
                  to={`/equipment/update/${id}`}
                  active="link--active">
                  <Icon icon="edit" />
              </NavLinkButton>
              <Button icon="trash" minimal/>
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
                    <SimpleMap position={coords}/>
                </Card>
            )}</Motion>
        <Motion defaultStyle={{x: -200, opacity: 0}} style={{x: spring(0), opacity: spring(1)}}>
            {style => (
                <Card elevation={2} className="card__cfg" style={{opacity: style.opacity, transform: `translateX(${style.x}px)`}}>
                    <h3 className="card__tag">Файл конфигурации</h3>
                    <Callout>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam cupiditate excepturi, expedita facilis illum vero? Aliquid consequuntur earum enim explicabo fugit impedit magnam perferendis repellendus saepe tenetur. Architecto eligendi eos et laboriosam nostrum quos repellendus vero? Ab assumenda beatae, corporis eius enim facilis id illo, illum ipsa iure magnam nemo neque officia officiis sapiente totam unde voluptatem voluptatibus! Dolore eius exercitationem illo nobis quae voluptas! Accusamus aliquam animi, consequatur eaque explicabo hic iusto laborum tempore! Asperiores delectus, dicta distinctio et excepturi iste nihil odit placeat quae quibusdam repellendus reprehenderit similique sit sunt voluptate. Aperiam architecto aspernatur blanditiis cum cupiditate distinctio earum eligendi est facilis, fuga harum illum incidunt ipsam, laudantium modi molestiae odio perferendis perspiciatis placeat possimus provident quia reiciendis rerum sequi sit temporibus totam ullam velit, voluptas voluptatem. Ab aperiam autem cupiditate ex incidunt iusto numquam quam recusandae saepe vitae. Accusantium architecto asperiores at aut commodi consequatur culpa cumque deleniti dolorem earum eius eligendi enim excepturi facilis hic illum in laboriosam laborum modi mollitia natus necessitatibus nulla officia omnis quaerat quam quas quisquam ratione, repudiandae sit soluta velit veritatis voluptates! Ad deserunt in nobis. A, cum enim et excepturi, facere iste magnam nemo provident quasi quia quis, ut!</Callout>
                </Card>
            )}</Motion>
      <Button
          className="card__del"
          large
          fill
          onClick={() => {
            remove(id, () => history.push('/equipments/dashboard/table'))
          }}
          intent={Intent.DANGER}
          text="Удалить"/>
  </div>
}

export default EquipmentCard