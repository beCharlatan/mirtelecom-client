import * as React from 'react'
import {Map, TileLayer, Marker} from 'react-leaflet'
import NoDataMessage from '../error/no-data-message'

interface ISimpleMapProps {
    position: number[]
}

const SimpleMap: React.FC<ISimpleMapProps> = ({
    position
}) => {
    return <React.Fragment>
        {position &&
        (<Map center={position} zoom={16} style={{height: "35rem"}}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}/>
        </Map>)}
        {!position &&
        <NoDataMessage
            icon="issue"
            title="Нет данных о местоположении объекта"
            desc=""/>}
    </React.Fragment>

}

export default SimpleMap