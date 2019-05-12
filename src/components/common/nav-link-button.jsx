import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button} from '@blueprintjs/core'

const NavLinkButton = (props) => {
  const {active, to, onClick, isActive, ...rest} = props
  return (
    <NavLink to={to} 
      activeClassName={active}
      isActive={isActive} 
      style={{textDecoration: 'none', color: 'inherit'}}>
      <Button
        {...rest}
        onClick={(event) => {
          onClick && onClick(event)
        }}
      />
    </NavLink>
  )
}

export default NavLinkButton;