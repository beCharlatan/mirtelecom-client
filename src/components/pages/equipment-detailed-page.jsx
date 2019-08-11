import React from 'react'
import EquipmentContainer from '../../containers/equipment-container'
import EquipmentCard from '../../features/equipment/equipment-card'
import ErrorBoundry from '../error/error-boundry'

const EquipmentDetailedPage = ({history}) => {
  return <section className="container">
    <ErrorBoundry>
      <EquipmentContainer
        render={({data, remove, geocode}) => <EquipmentCard history={history} data={data} remove={remove} geocode={geocode} />}
      />
    </ErrorBoundry>
  </section>
}

export default EquipmentDetailedPage