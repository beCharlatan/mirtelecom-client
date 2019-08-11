import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Alignment, Popover, Button, Position, PopoverInteractionKind, MenuItem, Menu} from '@blueprintjs/core'
import AuthForm from '../forms/auth-form'  

const AppHeader = () => {
  return <Navbar fixedToTop className="bp3-dark header">
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>МирТелеКом</Navbar.Heading>
    </Navbar.Group>
    <Navbar.Group align={Alignment.LEFT} className="header__links">
      <Navbar.Divider className="header__divider" />
      <NavLink 
        to="/" 
        className="disable-link">
        <Button minimal text="Оборудование" />
      </NavLink>
      <NavLink 
        to="/clients"
        className="disable-link">
        <Button minimal text="Клиенты" />
      </NavLink>
      <NavLink 
        to="/links"
        className="disable-link">
        <Button minimal text="Линки" />
      </NavLink>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT} className="header__auth">
      <Popover
        minimal
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="bp3-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}>
        <Button minimal icon="person" />
        <AuthForm />
      </Popover>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT} className="header__burger">
      <Popover 
        minimal 
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM_RIGHT}
        autoFocus={false}>
        <Button icon="menu" className="burger-menu"/>
        <Menu>
          <MenuItem
            text="Оборудование"
            tagName={NavLink}
            to="/" />
          <MenuItem
            text="Клиенты"
            tagName={NavLink}
            to="/clients" />
          <MenuItem  
            text="Линки"
            tagName={NavLink}
            to="/links" />
          <Menu.Divider />
          <MenuItem text="Авторизация">
            <AuthForm />
          </MenuItem>
        </Menu>
      </Popover>
    </Navbar.Group>
  </Navbar>
}

export default AppHeader