import React, {memo} from 'react'

const EquipmentStatistics = ({data}) => {

  const mtkItems = data.filter(i =>
    i.status.toUpperCase() === "MTK" || i.status.toUpperCase() === "МТК")

  const ekItems = data.filter(i =>
    i.status.toUpperCase() === "EK" || i.status.toUpperCase() === "ЭК")

  return <article className="stats-bar">
    <span className="stats-bar__item">
      <b className="stats-bar__count stats-bar__count--default">{data.length}</b>
      объектов</span>
    <span className="stats-bar__item">
      <b className="stats-bar__count stats-bar__count--blue">{mtkItems.length}</b>
      АО МирТелеКом</span>
    <span className="stats-bar__item">
      <b className="stats-bar__count stats-bar__count--red">{ekItems.length}</b>
      Энергокомплекс</span>
  </article>
}

export default memo(EquipmentStatistics)