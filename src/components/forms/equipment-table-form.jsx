import React, {useState} from 'react'
import {Button, Collapse, Card, Divider, Intent} from '@blueprintjs/core'
import withOptions from '../../HOC/with-options'
import {Field, Form} from "react-final-form"
import TextInput from '../common/text-input'
import SwitchInput from "../common/switch-input"
import MultiselectInput from '../common/multiselect-input'

const EquipmentTableOptionsForm = ({options, columns, changeOptions, saveOptions}) => {

  let [isOpen, setOpen] = useState(0)
  const toggleOpen = () => setOpen(!isOpen)

  const {shownFields} = options

  const selectColumn = (item, values) => changeOptions({
    options: {
      ...values,
      shownFields: [
        ...values.shownFields,
        item
      ]
    },
    optionsType: 'equipmentTable'
  })

  const deselectColumn = (item, values) => changeOptions({
    options: {
      ...values,
      shownFields: values.shownFields.filter(i => i !== item)
    },
    optionsType: 'equipmentTable'
  })

  const saveChanges = (vals) => () => saveOptions(vals, 'equipmentTableOptions') 

  return <React.Fragment>
    <Button
      minimal
      className="options__btn"
      onClick={toggleOpen}>
      {isOpen ? "Скрыть" : "Показать"} настройки таблицы
    </Button>
    <Collapse isOpen={isOpen}>
      <Card className="options__card opt-card">
        <Form
          initialValues={options}
          onSubmit={(values) => changeOptions({
            options: values,
            optionsType: 'equipmentTable'
          })}
          render={({
                     handleSubmit,
                     values
                   }) => (
            <form onSubmit={handleSubmit} className='form'>
              <Field
                type='checkbox'
                name='showPaginationTop'
                component={SwitchInput}
                label='Пагинация вверху таблицы'/>
              <Field
                type='checkbox'
                name='resizable'
                component={SwitchInput}
                label='Менять ширину столбцов'/>
                <Divider className="opt-card__divider" />
              <Field
                type="number"
                min={1}
                max={100}
                name='pageSize'
                component={TextInput}
                label='Число элементов на странице:'
                placeholder='Введите целое число' />
              <Field
                name='shownFields'
                items={columns}
                selectedItems={shownFields}
                onSelect={item => selectColumn(item, values)}
                onDeselect={item => deselectColumn(item, values)}
                component={MultiselectInput}
                label='Отображать поля в таблице:'
                placeholder='Выберите поля...' />
              <Divider className="opt-card__divider" />
              <Button
                type='submit'
                intent={Intent.PRIMARY}
                text='Применить' />
              <Button
                type='button'
                minimal
                onClick={saveChanges(values)}
                text='Сохранить' />  
            </form>
          )}/>
      </Card>
    </Collapse>
  </React.Fragment>
}

export default withOptions('equipmentTable', 'equipment')(EquipmentTableOptionsForm)