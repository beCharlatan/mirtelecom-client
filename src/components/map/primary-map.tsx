import * as React from 'react'
import {Map, TileLayer, Popup, Marker, LayersControl, Tooltip, GeoJSON, withLeaflet} from 'react-leaflet'
import PrintControlDefault from 'react-leaflet-easyprint'
import MagnifyingGlassControlDefault from 'react-leaflet-magnifying-glass'
import MeasureControlDefault from 'react-leaflet-measure'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {measureOprions, glassOptions, printOptions, saveAsPngOptions} from './options'
import EquipmentPopup from './equipment-popup'
import {IconEquipEk, IconEquipMtk, IconEquipDef, getCustomMuftMarker} from './marker'

const {BaseLayer, Overlay} = LayersControl
const PrintControl = withLeaflet(PrintControlDefault)
const MagnifyingGlassControl = withLeaflet(MagnifyingGlassControlDefault)
const MeasureControl = withLeaflet(MeasureControlDefault)

export interface IEquipmentProps {
    id: number,
    type: string,
    geometry: {
        type: string,
        coordinates: string[]
    },
    properties: {
        name: string,
        address: string,
        equipment: string,
        status: string,
        ip: string,
        sn: string,
        note: string
    }
}

interface IPrimaryMapProps {
    features: {
        equipments: {
            type: string,
            features: IEquipmentProps[]
        },
        substations: {
            type: string,
            features: Object[]
        },
        mufts: {
            type: string,
            features: Object[]
        },
        vok: {
            type: string,
            features: Object[]
        }
    }
}

class PrimaryMap extends React.Component<IPrimaryMapProps> {

    private printControl: any

    render() {
        let {
            features
        } = this.props
        const {substations, mufts, vok} = features
        const markers: IEquipmentProps[] = features['equipments'].features
        return <Map
            center={[55.753215, 37.622504]}
            zoom={10}
            maxZoom={19}
            className="map"
            style={{height: "80rem", marginBottom: "4rem"}}>
            <MagnifyingGlassControl {...glassOptions} />
            <PrintControl
                ref={(ref) => {this.printControl = ref}}
                {...printOptions}
            />
            <PrintControl {...saveAsPngOptions} />
            <MeasureControl {...measureOprions} />
            <LayersControl position="topright">
                <BaseLayer name="OpenStreetMap" checked>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </BaseLayer>
                <Overlay name="Оборудование" checked>
                    <MarkerClusterGroup>
                        {
                            markers && markers.map((i, idx): React.ReactNode => {
                                if (i.geometry)
                                    return <Marker key={idx}
                                                   icon={i.properties.status === 'MTK' || i.properties.status === 'МТК' ? IconEquipMtk : i.properties.status === 'EK' || i.properties.status === 'ЭК' ? IconEquipEk : IconEquipDef}
                                                   position={i.geometry.coordinates.reverse()}>
                                        <Popup><EquipmentPopup item={i}/></Popup>
                                        <Tooltip>{i.properties.name}</Tooltip>
                                    </Marker>
                            })
                        }
                    </MarkerClusterGroup>
                </Overlay>
                <Overlay name="Подстанции" checked>
                    {!!Object.entries(substations).length &&
                    <GeoJSON
                        onEachFeature={(feature, layer): void => {
                            return layer.bindPopup(`
                                <h4>${feature.properties.name}</h4>
                            `)
                        }}
                        data={substations}/>}
                </Overlay>
                <Overlay name="Муфты" checked>
                    {!!Object.entries(mufts).length &&
                    <GeoJSON
                      pointToLayer={getCustomMuftMarker}
                      data={mufts}
                        />}
                </Overlay>
                <Overlay name="ВОК" checked>
                    {!!Object.entries(vok).length &&
                    <GeoJSON
                      style={() => ({
                          weight: 5
                      })}
                      onEachFeature={(feature, layer): void => {
                          return layer.bindPopup('трасса ВОК АО МирТелеКом')
                      }}
                      data={vok} />}
                </Overlay>
            </LayersControl>
        </Map>
    }
}

export default PrimaryMap