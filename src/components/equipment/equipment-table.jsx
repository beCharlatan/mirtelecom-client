import React, {useState} from 'react'
import {Table, Column, SortDirection, AutoSizer} from 'react-virtualized'
import {Link} from 'react-router-dom'
import {Button, Popover, Position, Menu, MenuItem, Intent} from '@blueprintjs/core/lib/esm/index'
import NoDataMessage from '../error/no-data-message'
import EquipmentStatistics from '../statistics-bar/equipment-statistics'
import {sort} from '../../utils'
import 'react-virtualized/styles.css'

export const ToolMenu = ({ rowData, remove }) => {
  return (
    <Menu>
      <MenuItem
        icon='edit'
        text="Изменить"
        tagName={Link}
        to={`/equipment/update/${rowData.id}`} />
      <MenuItem
        icon='map-marker'
        text="На карте"
        tagName={Link}
        to={`/equipment/map/${rowData.id}`} />
      <MenuItem
        icon='trash'
        intent={Intent.DANGER}
        text="Удалить"
        onClick={() => remove(rowData.id)} />
    </Menu>
  )
}

const EquipmentTable = ({data, remove}) => {

  let [sortBy, setSortBy] = useState('name')
  let [sortDirection, setSortDirection] = useState(SortDirection.DESC)
  let [list, setList] = useState(data)

  const _noRowsRender = () => <NoDataMessage
    icon="document"
    title="Нет подходящих результатов"
    desc="По данным выборки ни одного экземпляра сущности подобрано не было"/>

  const _sortItems = ({ sortBy, sortDirection }) => {
    const sortedItems = sort({ sortBy, sortDirection }, list)
    setSortBy(sortBy)
    setSortDirection(sortDirection)
    setList(sortedItems)
  }
  
  const cellRenderer = (data) => <div style={{whiteSpace: 'normal'}}>{data.cellData}</div>

  return <React.Fragment>
    <EquipmentStatistics data={list} />
    <AutoSizer disableHeight>
    {({width}) => (
      <Table
        width={width}
        height={600}
        headerHeight={50}
        rowHeight={50}
        rowCount={list.length}
        rowGetter={({index}) => list[index]}
        noRowsRenderer={_noRowsRender}
        sort={_sortItems}
        sortBy={sortBy}
        sortDirection={sortDirection}
        className="table"
        headerClassName="table-header"
        rowClassName="table-row"
        gridClassName="table-grid"
      >
        <Column
          label='Название'
          width={.13 * width}
          dataKey="name"
          cellRenderer={({rowData}) => (
            <Link to={`/equipment/details/${rowData.id}`}>
              {rowData.name}
            </Link>
          )}/>
        <Column
          label='Адрес'
          dataKey='address'
          width={.21 * width}
          cellRenderer={cellRenderer}/>
        <Column
          label='Оборудование'
          dataKey='equipment'
          width={.16 * width}
          cellRenderer={cellRenderer}/>
        <Column
          label='Статус'
          dataKey='status'
          width={.07 * width}
          cellRenderer={cellRenderer}/>
        <Column
          label='IP адрес'
          dataKey='ip'
          width={.12 * width}
          cellRenderer={cellRenderer}/>
        <Column
          label='Серия №'
          dataKey='sn'
          width={.2 * width}
          cellRenderer={cellRenderer}
        />
        <Column
          label='Заметки'
          dataKey='note'
          width={.1 * width}
          cellRenderer={cellRenderer}/>
        <Column
          dataKey='tools'
          disableSort
          width={.04 * width}
          cellRenderer={
            ({rowData}) => {
              return (
                <Popover
                  content={<ToolMenu rowData={rowData} remove={remove}/>}
                  position={Position.LEFT}>
                  <Button minimal intent={Intent.PRIMARY} icon="more"/>
                </Popover>
              )
            }
          }/>
      </Table>
    )}
  </AutoSizer>
  </React.Fragment>
}

export default EquipmentTable