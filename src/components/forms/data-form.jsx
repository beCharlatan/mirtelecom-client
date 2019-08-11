import React from 'react'
import {Form, Field} from 'react-final-form'
import {Button, Card, Intent} from '@blueprintjs/core'

const DataForm = ({mask, handleSubmit, ...props}) => {

  const {fields, load, error} = props

  return (
    <Card elevation={2}>
      <Form
        onSubmit={handleSubmit}
        initialValues={fields}
        render={({
        handleSubmit,
        submitting,
        pristine,
        invalid,
        reset
      }) => (
        <form onSubmit={handleSubmit}>
          {
            mask.map(({...props}, id) => {
              return (
                <Field key={id} {...props} initialValue={fields ? fields[props.name] : ''} />
              )
            })
          }
          <div className="buttons">
            {error && <Button
              type='submit'
              disabled={submitting || pristine || invalid}
              loading={load}
              icon="error"
              intent={Intent.WARNING}
              text="Ошибка. Отправить заново" />}
            {!error && <Button
              type='submit'
              disabled={submitting || pristine || invalid}
              loading={load}
              intent={Intent.SUCCESS}
              icon={fields ? 'automatic-updates' : 'plus'}
              text={fields ? 'Обновить' : 'Создать'} />}
            {!fields && !load &&
              <Button
                minimal
                onClick={reset}
                text='Сбросить' />
            }
          </div>
        </form>
      )}/> 
    </Card>
  )
}

export default DataForm