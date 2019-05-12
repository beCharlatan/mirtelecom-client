import * as React from 'react'
import {IItemProps} from './primary-map'

interface IEquipmentPopupProps {
    item: IItemProps
}

const EquipmentPopup: React.FC<IEquipmentPopupProps> = ({
    item
}) => {
    const {name, address, equipment} = item
    return <div style={{width: '100%'}}>
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{equipment}</p>
    </div>
}

export default EquipmentPopup