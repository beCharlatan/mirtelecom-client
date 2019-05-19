import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const EquipRtable = ({data, remove}) => {

  const columns = [{
    Header: 'Наименование',
    accessor: 'name'
  }, {
    Header: 'Адрес',
    accessor: 'address'
  }, {
    Header: 'Оборудование',
    accessor: 'equipment'
  }, {
    Header: 'Статус',
    accessor: 'status'
  }, {
    Header: 'IP адрес',
    accessor: 'ip'
  }, {
    Header: 'Сер. номер',
    accessor: 'sn'
  }, {
    Header: 'Примечание',
    accessor: 'note',
    sortable: false
  }]

  return <ReactTable
    previousText={'Предыдущая'}
    nextText={'Следующая'}
    pageText={'Страница'}
    ofText={'из'}
    rowsText={'эл.'}
    defaultPageSize={25}
    pageSizeOptions={[10, 20, 25, 50]}
    data={data}
    columns={columns}
  />

}

export default EquipRtable