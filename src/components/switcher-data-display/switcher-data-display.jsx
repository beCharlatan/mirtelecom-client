import React from 'react';
import NavLinkButton from '../common/nav-link-button'
import {ButtonGroup} from '@blueprintjs/core'
import {Icon} from "@blueprintjs/core";

const equipmentOptions = [
  {
    to: '/equipments/dashboard/table',
    icon: 'th',
    title: 'Отобразить таблицей'
  },
  {
    to: '/equipments/dashboard/list',
    icon: 'list',
    title: 'Отобразить списком'
  }
]

const SwitcherDataDisplay = ({options}) => {
  return (
    <ButtonGroup minimal>
      {
        options.map((i, id) => (
          <NavLinkButton
            title={i.title}
            key={id}  
            to={i.to}
            active="link--active">
            <Icon icon={i.icon} />
          </NavLinkButton>
        ))
      }
    </ButtonGroup>
  );
};

const EquipmentSwitcher = () => (<SwitcherDataDisplay options={equipmentOptions} />)

export {
  EquipmentSwitcher
}
