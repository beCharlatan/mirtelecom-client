import * as React from 'react'
import {Map, TileLayer, Marker} from 'react-leaflet'
import {Button, Intent} from '@blueprintjs/core'
import withLocation from '../../HOC/with-location'

const SimpleMap = ({
    position,
    id,
    setLatLng
}) => {
    const refmarker = React.useRef(null)
    let [edit, setEdit] = React.useState(0)
    const setEditOn = () => () => setEdit(1)
    const setEditOff = () => () => setEdit(0)

    const saveCoords = () => () => {
        const marker = refmarker.current
        const coords = marker.leafletElement.getLatLng()
        if (coords) {
            setLatLng({id: id, coords: coords})
            setEditOff()()
        }
    }

    const cancelCoords = () => () => {
        const marker = refmarker.current
        if (marker) {
            marker.leafletElement.setLatLng(position)
            setEditOff()()
        }
    }

    return <React.Fragment>
        {!edit && <Button
            minimal
            intent={Intent.PRIMARY}
            text={`${position ? 'Изменить' : 'Задать'} местоположение`} 
            onClick={setEditOn()}
        />}
        {edit && <div>
            <Button
                intent={Intent.SUCCESS}
                text="Сохранить" 
                onClick={saveCoords()}
            />
            <Button
                minimal
                text="Отменить"
                onClick={cancelCoords()}
            />
        </div>}
        {!position && <h4>Нет данных о местоположении. Вы можете настрить их здесь</h4>}
        <Map center={position ? position : [55.753215, 37.622504]} zoom={position ? 14 : 10} style={{height: "35rem"}}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                ref={refmarker}
                position={position ? position : [55.753215, 37.622504]}
                draggable={!!edit}
                autoPan={true}
            />
        </Map>
    </React.Fragment>
}

export default withLocation()(SimpleMap)