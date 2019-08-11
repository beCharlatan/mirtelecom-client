import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import withOptions from '../../HOC/with-options'
import cl from 'classnames'
import {Link} from 'react-router-dom'
import {Icon, Intent, Button} from '@blueprintjs/core'
import EquipmentStatistics from '../../components/statistics-bar/equipment-statistics'
import {getUnique} from '../../utils'

const EquipRtable = ({data, remove, scrollTo, options, changeOptions}) => {

  const uniqueStatus = data && getUnique(data, 'status')
  const uniqueAddress = data && getUnique(data, 'address')
  const uniqueEquipment = data && getUnique(data, 'equipment')

  const goToMarker = data => () => {
    if (data.geom) {
      scrollTo('#primary-map', {speed: 500, easing: 'easeOutCubic'})
      changeOptions({
        options: {
          selectedItem: data.id
        },
        optionsType: 'map'
      })
    }
  }
  
  const deleteItem = (id, name) => () => {
    if (window.confirm(`Вы действительно хотите удалить ${name}?`))
      return remove(id)
  }

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
    Footer: <span>
      {data.length + ' '}
      всего
    </span>,
    Cell: ({row, value}) =>
      <div className="td-title" id={'equipment-' + row.id}>
        <Link to={`/equipments/${row.id}`}>
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
    Footer: <span>
      {uniqueAddress.length + ' '}
      локаций
    </span>,
    Cell: ({row}) =>
      <span
        className="link-to-marker"
        onClick={goToMarker(row)}>
      {row.address}
    </span>,
    filterMethod: (filter, row) => {
      if (filter.value === "all") return true
      return row[filter.id] === filter.value
    },
    Filter: ({ filter, onChange }) =>
    <select
      style={{width: '100%'}}
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : "all"}
    >
      <option value="all">Все</option>
      {
        uniqueAddress.map((i, idx) => 
          <option key={idx} value={i}>{i}</option>)
      }
    </select>
  }, {
    Header: 'Оборудование',
    accessor: 'equipment',
    show: shownFields.indexOf('equipment') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th',
    Footer: <span>
      {uniqueEquipment.length + ' '}
      видов
    </span>,
    filterMethod: (filter, row) => {
      if (filter.value === "all") return true
      return row[filter.id] === filter.value
    },
    Filter: ({filter, onChange}) =>
      <select
        style={{width: '100%'}}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : "all"}>
        <option value="all">Все</option>
        {
          uniqueEquipment.map((i, idx) => 
            <option key={idx} value={i}>{i}</option>)
        }
      </select>
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
    </div>,
    filterMethod: (filter, row) => {
      if (filter.value === "all") return true
      return row[filter.id] === filter.value
    },
    Filter: ({ filter, onChange }) =>
      <select
        style={{width: '100%'}}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : "all"}>
        <option value="all">Все</option>
        {
          uniqueStatus.map((i, idx) => 
            <option key={idx} value={i}>{i}</option>)
        }
      </select>
  }, {
    Header: 'IP адрес',
    accessor: 'ip',
    show: shownFields.indexOf('ip') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th',
    maxWidth: 130,
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
    filterable: false,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'ID',
    accessor: 'id',
    filterable: false,
    show: shownFields.indexOf('id') > -1,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: 'Геометрия',
    accessor: 'geom',
    show: shownFields.indexOf('geom') > -1,
    sortable: false,
    filterable: false,
    className: 'rtable__td',
    headerClassName: 'rtable__th'
  }, {
    Header: <Icon icon='cross' />,
    maxWidth: 50,
    headerClassName: 'rtable__th',
    sortable: false,
    filterable: false,
    Cell: ({row}) =>
      <Button
        icon="cross"
        minimal
        fill
        className="td-delete"
        onClick={deleteItem(row.id, row.name)}
        intent={Intent.DANGER}/>   
  }]

  return <React.Fragment>
    <EquipmentStatistics data={data} />
    <ReactTable
      // style={{height: '95vh'}}
      className="-striped -highlight rtable"
      previousText={'Предыдущая'}
      nextText={'Следующая'}
      pageText={'Страница'}
      ofText={'из'}
      rowsText={'эл.'}
      pageSize={+pageSize}
      minRows={1}
      showPageSizeOptions={false}
      showPaginationTop={showPaginationTop}
      resizable={resizable}
      noDataText="Нет данных"
      data={data}
      columns={columns}
      filterable
    />
  </React.Fragment>
}

export default withOptions('equipmentTable')(React.memo(EquipRtable))