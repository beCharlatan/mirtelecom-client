import React from 'react'
import {NavLink} from 'react-router-dom'
import NavLinkButton from '../common/nav-link-button'
import {Navbar, Alignment, Popover, Button, Menu, MenuItem} from '@blueprintjs/core'

const popupMenu = (
  <Menu>
    <MenuItem
      text="Оборудование"
      tagName={NavLink}
      to="/equipments/dashboard/table" />
    <MenuItem
      text="Клиенты"
      tagName={NavLink} 
      to="/clients" />
    <MenuItem  
      text="Линки"
      tagName={NavLink}
      to="/links" />
  </Menu>
)

const AppHeader = () => {
  return <Navbar className="bp3-dark app-header">
    <Navbar.Group>
      <img src="../../assets/miniLogo.svg" alt="логотип программы" className="app-header__logo"/>
      <Navbar.Heading className="head-2">МТКмененджер</Navbar.Heading>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT} className="app-header__nav">
      <NavLinkButton minimal
                     title="Таблица оборудования"
                     className="app-header__link"
                     text="Оборудование"
                     to="/equipments/dashboard/table"
                     isActive={(_, {pathname}) => pathname.match(/\/equipments\/dashboard\/(table|list)/)}
                     active="link--active"/>
      <NavLinkButton minimal
                     title="Таблица клиентов"
                     className="app-header__link"
                     text="Клиенты"
                     to="/clients"
                     active="link--active"/>
      <NavLinkButton minimal
                     title="Полезные источники"
                     className="app-header__link"
                     text="Линки"
                     to="/links"
                     active="link--active"/>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      <Popover content={popupMenu} minimal>
        <Button icon="menu" className="app-header__burger btn btn--blue"/>
      </Popover>
    </Navbar.Group>
  </Navbar>
}

export default AppHeader