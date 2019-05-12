import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from '../common/protected-route'
import HomePage from '../pages/home-page'
import EquipmentPage from '../pages/equipment-page'
import EquipmentDetailedPage from '../pages/equipment-detailed-page'
import ClientsPage from '../pages/clients-page'
import EquipmentFormPage from '../pages/equipment-form-page'
import Page404 from '../error/404'
import AppHeader from '../header/app-header'
import Notification from '../common/notification'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
      <Route path='/(.+)' render={() => <div>
        <AppHeader/>
        <Notification/>
        <Switch>
          <Route
            exact
            path="/equipments/dashboard/:display"
            component={EquipmentPage}/>
          <ProtectedRoute
            path="/equipment/details/:id"
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
            component={Page404}/>
        </Switch>
      </div>} />
    </div>
  );
}

export default App;