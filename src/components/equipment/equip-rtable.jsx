import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import withOptions from '../../HOC/with-options'
import cl from 'classnames'
import {Link} from 'react-router-dom'
import {Icon, Intent, Button} from '@blueprintjs/core'

const EquipRtable = ({data, remove, options}) => {

  const {pageSize,
    showPaginationTop,
    resizable,
    shownFields} = options

  const columns = [{
    Header: 'Наименование',
    accessor: 'name',
    show: shownFields.indexOf('name') > -1,
    className: 'rtable__td table-title',
    headerClassName: 'rtable__th',
    Cell: ({row, value}) =>
      <div className="td-title">
        <Link to={`/equipment/details/${row.id}`}>
          {value}
        </Link>
        <Link to={`/equipment/update/${row.id}`}>
          <Icon icon="edit"
                className="opacity60"/>
        </Link>
      </div>
  }, {
    Header: <React.Fragment>
      Адрес
      <Icon icon="map-marker"
        className="opacity60 ml1"/>
    </React.Fragment>,
    accessor: 'address',
    show: shownFields.indexOf('address') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th',
    Cell: ({row}) =>
      <span
        onClick={() => {}} >
      {row.address}
    </span>
  }, {
    Header: 'Оборудование',
    accessor: 'equipment',
    show: shownFields.indexOf('equipment') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'Статус',
    accessor: 'status',
    show: shownFields.indexOf('status') > -1,
    maxWidth: 100,
    headerClassName: 'rtable__th',
    Cell: row => <div
      className={cl('rtable__td', {
        'rtable__td--red': !!row.value.match(/ek|Ek|EK|ЭК|эк|Эк/),
        'rtable__td--blue': !!row.value.match(/mtk|MTK|мтк|МТК/)
      })}>
      {row.value}
    </div>
  }, {
    Header: 'IP адрес',
    accessor: 'ip',
    show: shownFields.indexOf('ip') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'Сер. номер',
    accessor: 'sn',
    show: shownFields.indexOf('sn') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'Примечание',
    accessor: 'note',
    show: shownFields.indexOf('note') > -1,
    sortable: false,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'ID',
    accessor: 'id',
    show: shownFields.indexOf('id') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'Геометрия',
    accessor: 'geom',
    show: shownFields.indexOf('geom') > -1,
    sortable: false,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: <Icon icon='cross' />,
    maxWidth: 50,
    headerClassName: 'rtable__th',
    sortable: false,
    Cell: ({row}) =>
      <Button
        icon="cross"
        minimal
        fill
        className="td-delete"
        onClick={() => {
          if (window.confirm(`Вы действительно хотите удалить ${row.name}?`))
            return remove(row.id)
        }}
        intent={Intent.DANGER}/>
  }]

  return <ReactTable
    className="-striped -highlight rtable"
    previousText={'Предыдущая'}
    nextText={'Следующая'}
    pageText={'Страница'}
    ofText={'из'}
    rowsText={'эл.'}
    pageSize={+pageSize}
    minRows={+pageSize}
    showPageSizeOptions={false}
    showPaginationTop={showPaginationTop}
    resizable={resizable}
    data={data}
    columns={columns}
  />

}

export default withOptions('equipmentTable')(EquipRtable)