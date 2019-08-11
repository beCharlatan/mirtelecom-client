import React, {useRef, useState} from 'react'
import SwitcherDataDisplay from '../switcher-data-display/switcher-data-display'
import * as SmoothScroll from 'smooth-scroll'
import FeaturesContainer from '../../containers/features-container'
import AppToolbar from '../toolbar/app-toolbar'
import FilterItems from '../forms/filter-items'
import {ButtonGroup, Button, Intent} from '@blueprintjs/core'
import EquipmentsContainer from '../../containers/equipments-container'
import PrimaryMap from '../../features/map/primary-map'
import EquipmentList from '../../features/equipment/equipment-list'
import EquipRtable from '../../features/equipment/equip-rtable'
import EquipmentTableOptionsForm from '../forms/equipment-table-form'
import ErrorBoundry from "../error/error-boundry"

const goToZabbix = () => () => window.open("http://172.16.13.251/zabbix/maps.php", '_blank');

const equipmentOptions = [
  {
    value: 'table',
    icon: 'th',
    title: 'Отобразить таблицей'
  },
  {
    value: 'list',
    icon: 'list',
    title: 'Отобразить списком'
  }
];

const LinkButtons = <ButtonGroup>
  <Button
    onClick={goToZabbix()}
    title="Перейти на Zabbix"
    text='Zabbix'
    intent={Intent.PRIMARY} />
</ButtonGroup>;

const EquipmentPage = () => {

  let [dataDisplay, setDataDisplay] = useState('table');
  const onSetDataDisplay = (prop) => setDataDisplay(prop);

  const mapRef = useRef();

  const scrollTo = (target, options) => {
    const scroll = new SmoothScroll();
    const anchor = document.querySelector(target);
    scroll.animateScroll(anchor, null, options)
  }

  return <main>
    <AppToolbar
      left={<SwitcherDataDisplay options={equipmentOptions} action={onSetDataDisplay} current={dataDisplay} />}
      center={<FilterItems/>}
      right={LinkButtons}
    />
    <section className="container">
      {dataDisplay === 'table' && <EquipmentTableOptionsForm />}
      {dataDisplay === 'table' && <EquipmentsContainer
        render={({data, remove}) => <EquipRtable
          data={data}
          remove={remove}
          scrollTo={scrollTo}
        />}
      />}
      {dataDisplay === 'list' && <EquipmentsContainer
        render={({data, remove, history}) => <EquipmentList
          data={data}
          remove={remove}
          history={history}
          scrollTo={scrollTo}
        />}
      />}
      <ErrorBoundry>
        <FeaturesContainer
          render={({features}) => <PrimaryMap ref={mapRef} features={features} />}
        />
      </ErrorBoundry>
    </section>
  </main>
};

export default EquipmentPage