import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from '../common/protected-route'
import EquipmentPage from '../pages/equipment-page'
import EquipmentDetailedPage from '../pages/equipment-detailed-page'
import ClientsPage from '../pages/clients-page'
import LinksPage from '../pages/links-page'
import EquipmentFormPage from '../pages/equipment-form-page'
import Page404 from '../error/404'
import AppHeader from '../header/app-header'
import Notification from '../common/notification'

const App = () => {
  return (
    <React.Fragment>
      <AppHeader/>
      <Notification/>
      <main className="content">
        <Switch>
          <Route
            exact
            path="/"
            component={EquipmentPage}/>
          <ProtectedRoute
            exact
            path="/equipments/:id"
            component={EquipmentDetailedPage}/>
          <ProtectedRoute
            exact
            path="/equipment/create"
            component={EquipmentFormPage}/>
          <ProtectedRoute
            path="/equipment/update/:id"
            component={EquipmentFormPage}/>
          <Route
            path="/clients"
            component={ClientsPage}/>
          <Route
            path="/links"
            component={LinksPage}/>
          <Route
            component={Page404}/>
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App