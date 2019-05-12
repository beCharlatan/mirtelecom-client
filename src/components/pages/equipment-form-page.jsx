import React from 'react'
import {EquipmentForm} from '../mtk-components/mtk-forms'

const EquipmentFormPage = ({match}) => {
  return <div className="container form-page">
    <div className="card__header">
      <h1 className="card__title">{match.params.id ? 'Обновить оборудование' : 'Добавить новое оборудование'}</h1>
    </div>
    <EquipmentForm />
  </div>
};

export default EquipmentFormPage;