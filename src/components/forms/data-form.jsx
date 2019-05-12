import React from 'react'
import cl from 'classnames'
import {Form, Field} from 'react-final-form'
import {Button, Card} from '@blueprintjs/core'

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
              large
              icon="error"
              className='buttons__item btn btn--blue-alt'
              text="Ошибка. Отправить заново" />}
            {!error && <Button
              type='submit'
              disabled={submitting || pristine || invalid}
              loading={load}
              large
              icon={fields ? 'automatic-updates' : 'plus'}
              className={['buttons__item btn', cl('btn--green', fields &&  'btn--blue')]}
              text={fields ? 'Обновить' : 'Создать'} />}
            {!fields && !load &&
              <Button
                className='buttons__item btn btn--default'
                large
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