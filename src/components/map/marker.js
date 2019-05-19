import * as L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import markerEquipEk from '../../scss/markerEquipEk.svg'
import markerEquipMtk from '../../scss/markerEquipMtk.svg'
import markerEquipDef from '../../scss/markerEquipDef.svg'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconMuft from '../../img/muft.svg'

const DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [12, 40],
    shadowUrl: iconShadow,
    popupAnchor: [0, -40],
})

export const IconEquipEk = L.icon({
    iconUrl: markerEquipEk,
    iconSize: [35, 70],
    iconAnchor: [17, 50],
    popupAnchor: [0, -40],
})

export const IconEquipMtk = L.icon({
    iconUrl: markerEquipMtk,
    iconSize: [35, 70],
    iconAnchor: [17, 50],
    popupAnchor: [0, -40],
})

export const IconEquipDef = L.icon({
    iconUrl: markerEquipDef,
    iconSize: [35, 70],
    iconAnchor: [17, 50],
    popupAnchor: [0, -40],
})

export function getCustomMuftMarker(feature, latlng) {
    return L.marker(latlng, {icon: IconMuft})
}

export const IconMuft = L.icon({
    iconUrl: iconMuft,
    iconSize: [12, 12]
})

L.Marker.prototype.options.icon = DefaultIcon