import React from 'react'
import {EquipmentSwitcher} from '../switcher-data-display/switcher-data-display'
import AppToolbar from '../toolbar/app-toolbar'
import FilterItems from '../forms/filter-items'
import LinkButton from '../common/link-button'
import {ButtonGroup} from '@blueprintjs/core'
import EquipmentData from '../equipment/equipment-data'
import FeaturesData from '../map/features-data'
import PrimaryMap from '../map/primary-map'
import EquipmentTable from '../equipment/equipment-table'
import EquipmentList from '../equipment/equipment-list'
import EquipRtable from '../equipment/equip-rtable'
import EquipmentTableOptionsForm from '../forms/equipment-table-form'

const LinkButtons = <ButtonGroup>
  <LinkButton
    title="Перейти в систему мониторинга ВОК"
    to='/kek'
    text='OSPInsightFTI'
    className="btn btn--blue"/>
  <LinkButton
    title="Перейти на Zabbix"
    to='/kek'
    text='Zabbix'
    className="btn btn--blue"/>
</ButtonGroup>

const EquipmentPage = ({match}) => {
  return <section className="container">
    <div className="card__header">
      <h1 className="card__title">Оборудование АО МирТелеКом</h1>
    </div>
    <AppToolbar
      left={<EquipmentSwitcher/>}
      center={<FilterItems/>}
      right={LinkButtons}
    />
    <EquipmentTableOptionsForm />
    {
      match.params.display === 'table' &&
      <EquipmentData
        render={({data, remove}) => <EquipRtable data={data} remove={remove} />}
      />
    }
    {/*{*/}
    {/*  match.params.display === 'table' &&*/}
    {/*  <EquipmentData*/}
    {/*    render={({data, remove}) => <EquipmentTable data={data} remove={remove} />}*/}
    {/*  />*/}
    {/*}*/}
    {
      match.params.display === 'list' &&
      <EquipmentData
        render={({data}) => <EquipmentList data={data} />}
      />
    }
    <div className="card__header">
      <h1 className="card__title">Карта</h1>
    </div>
    <FeaturesData
      render={({features}) => <PrimaryMap features={features}/>}
    />
  </section>
}

export default EquipmentPage