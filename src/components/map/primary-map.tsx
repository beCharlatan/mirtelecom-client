import * as React from 'react'
import {Map, TileLayer, Marker, Popup, Tooltip, LayerGroup, LayersControl, withLeaflet} from 'react-leaflet'
import PrintControlDefault from 'react-leaflet-easyprint'
import MagnifyingGlassControlDefault from 'react-leaflet-magnifying-glass'
import MeasureControlDefault from 'react-leaflet-measure'
import DeflateDefault from 'react-leaflet-deflate'
// import { ReactLeafletSearch } from 'react-leaflet-search'
import EquipmentPopup from './equipment-popup'

const {BaseLayer, Overlay} = LayersControl

const Deflate = withLeaflet(DeflateDefault)
const PrintControl = withLeaflet(PrintControlDefault)
const MagnifyingGlassControl = withLeaflet(MagnifyingGlassControlDefault)
const MeasureControl = withLeaflet(MeasureControlDefault)
// const ReactLeafletSearchCustom = withLeaflet(ReactLeafletSearch)

const measureOprions = {
    position: 'topleft',
    primaryLengthUnit: 'meters',
    popupOptions: {className: 'leaflet-measure-resultpopup', autoPanPadding: [60, 60]},
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'acres',
    activeColor: '#669eff',
    completedColor: '#2965cc'
}

const glassOptions = {
    position: 'topleft',
    radius: 100,
    zoomOffset: 3
}

const printOptions = {
    title: "Напечатать карту",
    position: "topright",
    hideControlContainer: false,
    sizeModes: ['A4Portrait', 'A4Landscape']
}

const saveAsPngOptions = {
    title: "Экспорт карты в PNG",
    position: "topright",
    sizeModes: ['A4Portrait', 'A4Landscape'],
    hideControlContainer: true,
    exportOnly: true
}

export interface IItemProps {
    gid: number,
    name: string,
    address: string,
    equipment: string,
    status: string,
    ip: string,
    sn: string,
    note: string,
    geom: string,
    st_asgeojson: string
}

interface IPrimaryMapProps {
    data: IItemProps[]
}

class PrimaryMap extends React.Component<IPrimaryMapProps> {
    private printControl: any
    render() {
        let {
            data
        } = this.props
        return <Map
            center={[55.753215, 37.622504]}
            zoom={10}
            className="map"
            style={{height: "80rem", marginBottom: "4rem"}}>
            <MagnifyingGlassControl {...glassOptions} />
            <PrintControl
                ref={(ref) => {this.printControl = ref}}
                {...printOptions}
            />
            <PrintControl {...saveAsPngOptions} />
            <MeasureControl {...measureOprions} />
            {/*<ReactLeafletSearchCustom*/}
            {/*    position="topleft"*/}
            {/*    provider="OpenStreetMap"*/}
            {/*    providerOptions={{region: 'gb'}}*/}
            {/*/>*/}
            <LayersControl position="topright">
                <BaseLayer name="OpenStreetMap" checked>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </BaseLayer>
                <Overlay name="Оборудование" checked>
                    <LayerGroup>
                        {
                            data && data.map((i: IItemProps, id: number): React.ReactNode => {
                                if (i.st_asgeojson) {
                                    const coords = i.st_asgeojson && JSON.parse(i.st_asgeojson).coordinates.reverse()
                                    return <Marker key={id} position={coords}>
                                        <Popup>
                                            <EquipmentPopup item={i} />
                                        </Popup>
                                        <Tooltip direction="left" offset={[-5, 20]}>{i.name}</Tooltip>
                                    </Marker>
                                }
                            })
                        }
                    </LayerGroup>
                </Overlay>
            </LayersControl>
        </Map>
    }
}

export default PrimaryMap