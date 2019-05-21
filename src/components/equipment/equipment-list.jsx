import React from 'react'
import {Link} from 'react-router-dom'
import {AutoSizer, List} from 'react-virtualized'
import {
  Button,
  Card,
  Intent,
  Popover,
  Position
} from "@blueprintjs/core/lib/esm/index"
import {ToolMenu} from './equipment-table'
import 'react-virtualized/styles.css'

const ItemContext = React.createContext()

const Head = ({label}) => {
  return (
    <ItemContext.Consumer>
      {contextValue => <Link to={`/equipment/details/${contextValue.id}`}><h3 className="list__head">{contextValue[label]}</h3></Link>}
    </ItemContext.Consumer>
  )
}

const Sub = ({label}) => {
  return (
    <ItemContext.Consumer>
      {contextValue => <p className="list__sub">{contextValue[label]}</p>}
    </ItemContext.Consumer>
  )
}

const Desc = ({label}) => {
  return (
    <ItemContext.Consumer>
      {contextValue => <span className="list__desc">{contextValue[label]}</span>}
    </ItemContext.Consumer>
  )
}


const EquipmentList = ({data}) => {

  const rowRenderer = ({index, key, style}) => {
    const item = data[index], {id, equipment, name, address} = item;
    return (
      <Card key={key} style={style} className='list__item'>
        <ItemContext.Provider value={item}>
          <div className="list__content">
            <Link to={`/equipment/details/${id}`}><h3 className="list__head">{name}</h3></Link>
            <p className="list__sub">{address}</p>
            <span className="list__desc">{equipment}</span>
          </div>
          <div className="list__action">
            <Popover content={<ToolMenu rowData={item} />} position={Position.LEFT}>
              <Button minimal intent={Intent.PRIMARY} icon="more" />
            </Popover>
          </div>
        </ItemContext.Provider>
      </Card>
    )
  }

  return (
    <AutoSizer disableHeight>{
      ({width}) => (
        <List
          className="list"
          rowCount={data.length}
          width={width}
          height={600}
          rowHeight={600/8}
          rowRenderer={rowRenderer}
        />
      )
    }</AutoSizer>
  );
};

export default EquipmentList

export {Head, Sub, Desc}