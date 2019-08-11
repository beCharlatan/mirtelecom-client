import * as React from 'react'
import {Map, TileLayer, LayersControl, GeoJSON, withLeaflet, MapProps} from 'react-leaflet'
import PrintControlDefault from 'react-leaflet-easyprint'
import MeasureControlDefault from 'react-leaflet-measure'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {measureOprions, printOptions, saveAsPngOptions} from './options'
import CustomMarker from './custom-marker'
import withOptions from '../../HOC/with-options'
import {getCustomMuftMarker} from './marker'
import { GeoJsonObject } from 'geojson'

const {BaseLayer, Overlay} = LayersControl
const PrintControl = withLeaflet(PrintControlDefault)
const MeasureControl = withLeaflet(MeasureControlDefault)

export interface IEquipmentProps {
    id: number,
    type: string,
    geometry: {
        type: string,
        coordinates: number[]
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

export interface IPrimaryMapProps {
    options?: {
        selectedItem: number
    },
    changeOptions: Function,
    features: {
        equipments: {
            type: string,
            features: IEquipmentProps[]
        },
        substations: GeoJsonObject,
        mufts: GeoJsonObject,
        vok: GeoJsonObject
    }
}

class PrimaryMap extends React.Component<IPrimaryMapProps> {

    private printControl: any
    private map: Map<MapProps>

    componentDidUpdate(prevProps) {
        if (this.props.options && (this.props.options !== prevProps.options)) {
            const selectedItem = this.props.features['equipments'].features.find(i => i.id === this.props.options.selectedItem)
            let coords = selectedItem.geometry.coordinates
            this.map.leafletElement
                .panTo([0,0])
                .panTo([+coords[1], +coords[0]])
                .setZoom(18)
        }
    }
    
    componentWillUnmount() {
        this.props.changeOptions({
            options: {
                selectedItem: null
            },
            optionsType: 'map'
        })
    }

    render() {
        let {
            features,
            options: {
                selectedItem
            }
        } = this.props
        const {substations, mufts, vok} = features
        const markers: IEquipmentProps[] = features['equipments'].features
        return <Map
            ref={ref => {this.map = ref}}
            center={[55.753215, 37.622504]}
            zoom={12}
            maxZoom={19}
            id="primary-map"
            className="map"
            style={{height: "80rem"}}>
            <PrintControl
                ref={ref => {this.printControl = ref}}
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
                    <MarkerClusterGroup
                        removeOutsideVisibleBounds={true}
                        disableClusteringAtZoom={16}>
                        {
                            markers && markers.map((i, idx): React.ReactNode => {
                                if (i.geometry)
                                    return <CustomMarker
                                        selectedItem={selectedItem}
                                        position={[+i.geometry.coordinates[0], +i.geometry.coordinates[1]]} 
                                        key={idx} 
                                        item={i} />
                            })
                        }
                    </MarkerClusterGroup>
                </Overlay>
                <Overlay name="Подстанции" checked>
                    {!!Object.entries(substations).length &&
                    <GeoJSON
                        onEachFeature={(feature, layer) => {
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
                      onEachFeature={(_, layer) => {
                          return layer.bindPopup('трасса ВОК АО МирТелеКом')
                      }}
                      data={vok} />}
                </Overlay>
            </LayersControl>
        </Map>
    }
}

export default withOptions('map')(PrimaryMap)