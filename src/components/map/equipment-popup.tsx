import * as React from 'react'
import {IEquipmentProps} from './primary-map'

export interface IEquipmentPopupProps {
    item: IEquipmentProps
}

const EquipmentPopup: React.FC<IEquipmentPopupProps> = ({
    item
}) => {
    const {name, address, equipment} = item.properties
    return <div>
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{equipment}</p>
    </div>
}

export default EquipmentPopup