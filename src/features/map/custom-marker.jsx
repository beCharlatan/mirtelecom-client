import * as React from 'react'
import {Popup, Tooltip, Marker} from 'react-leaflet'
import {IconEquipEk, IconEquipMtk, IconEquipDef} from './marker'
import EquipmentPopup from './equipment-popup'

const CustomMarker = ({
    item,
    selectedItem,
    ...props
}) => {
  const {id, properties, geometry} = item
  const initMarker = ref => {
    if (ref) {
      window.setTimeout(() => {
        ref.leafletElement.openPopup()
      }, 100)
    }
  }
  return <Marker
    {...props}
    icon={
      properties.status.match(/ek|Ek|EK|ЭК|эк|Эк/) ?
      IconEquipEk : properties.status.match(/mtk|MTK|мтк|МТК/) ?
      IconEquipMtk : IconEquipDef
    }
    ref={id === selectedItem ? initMarker : null}
    position={[+geometry.coordinates[1], +geometry.coordinates[0]]}>
    <Popup>
      <EquipmentPopup item={item}/>
    </Popup>
    <Tooltip>{properties.name}</Tooltip>
  </Marker>
}

export default CustomMarker