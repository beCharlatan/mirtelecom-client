import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import withTableOptions from '../../HOC/with-table-options'

const EquipRtable = ({data, remove, options}) => {

  const {defaultPageSize,
    pageSizeOptions,
    showPaginationTop,
    resizable, shownFields} = options

  const columns = [{
    Header: 'Наименование',
    accessor: 'name',
    show: shownFields.indexOf('name') > -1
  }, {
    Header: 'Адрес',
    accessor: 'address',
    show: shownFields.indexOf('address') > -1
  }, {
    Header: 'Оборудование',
    accessor: 'equipment',
    show: shownFields.indexOf('equipment') > -1
  }, {
    Header: 'Статус',
    accessor: 'status',
    show: shownFields.indexOf('status') > -1
  }, {
    Header: 'IP адрес',
    accessor: 'ip',
    show: shownFields.indexOf('ip') > -1
  }, {
    Header: 'Сер. номер',
    accessor: 'sn',
    show: shownFields.indexOf('sn') > -1
  }, {
    Header: 'Примечание',
    accessor: 'note',
    show: shownFields.indexOf('note') > -1,
    sortable: false
  }]

  return <ReactTable
    previousText={'Предыдущая'}
    nextText={'Следующая'}
    pageText={'Страница'}
    ofText={'из'}
    rowsText={'эл.'}
    defaultPageSize={defaultPageSize}
    pageSizeOptions={pageSizeOptions}
    showPaginationTop={showPaginationTop}
    resizable={resizable}
    data={data}
    columns={columns}
  />

}

export default withTableOptions('equipmentTable')(EquipRtable)