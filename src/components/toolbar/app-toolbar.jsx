import React from 'react'
import {Navbar} from '@blueprintjs/core'

const AppToolbar = ({left, center, right}) => {
  return (
    <Navbar className="app-toolbar">
      <Navbar.Group className="app-toolbar__group">
        {left}
      </Navbar.Group>
      <Navbar.Divider className="app-toolbar__divider" />
      <Navbar.Group className="app-toolbar__group app-toolbar__group--big">
        {center}    
      </Navbar.Group>
      <Navbar.Divider className="app-toolbar__divider" />
      <Navbar.Group className="app-toolbar__group">
        {right}
      </Navbar.Group>
    </Navbar>
  )
}

export default AppToolbar