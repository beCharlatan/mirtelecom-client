import React from 'react'
import EquipmentData from '../equipment/equipment-data'
import EquipmentCard from "../equipment/equipment-card"

const EquipmentDetailedPage = () => {
  return <section className="container">
    <EquipmentData
      render={({data, remove}) => <EquipmentCard data={data} remove={remove} />}
    />
  </section>;
};

export default EquipmentDetailedPage;