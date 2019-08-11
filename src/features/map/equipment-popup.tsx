import * as React from 'react'
import * as SmoothScroll from 'smooth-scroll'
import {IEquipmentProps} from './primary-map'
import LinkButton from '../../components/common/link-button'
import {Divider, Intent} from '@blueprintjs/core'

export interface IEquipmentPopupProps {
    item: IEquipmentProps
}

const scrollTo = (id: number) => () => {
    const scroll = new SmoothScroll()
    const anchor = document.querySelector(`#equipment-${id}`)
    anchor && scroll.animateScroll(anchor, null, {speed: 500, easing: 'easeOutCubic', offset: 80})
}

const EquipmentPopup: React.FC<IEquipmentPopupProps> = ({
    item
}) => {
    const {name, address, equipment} = item.properties
    return <div>
        <h2 onClick={scrollTo(+item.id)}>{name}</h2>
        <h3>{address}</h3>
        <h3>{equipment}</h3>
        <Divider />
        <LinkButton
            fill
            small
            intent={Intent.PRIMARY}
            to={`/equipments/${item.id}`}
            text="Перейти в профиль"
        />
    </div>
}

export default EquipmentPopup