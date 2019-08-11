import React from 'react'

const EquipmentStatistics = ({data}) => {
  const mtkItems = data.filter(i => i.status.match(/mtk|MTK|мтк|МТК/))
  const ekItems = data.filter(i => i.status.match(/ek|Ek|EK|ЭК|эк|Эк/))

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

export default React.memo(EquipmentStatistics)