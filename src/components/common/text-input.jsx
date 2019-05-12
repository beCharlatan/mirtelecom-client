import React from 'react'
import cl from 'classnames'
import {FormGroup, InputGroup, Intent} from '@blueprintjs/core'

const TextInput = ({input, type, placeholder, label, meta: {touched, error}}) => {
  return (
    <FormGroup
      className={cl('input-label', touched && error && 'error-text')}
      label={label}
      labelFor={`id-${input.name}`}
      intent={touched && error ? Intent.DANGER : null}
      helperText={touched && error ? error : null}
      >
      <InputGroup
        {...input}
        id={`id-${input.name}`}
        intent={touched && error ? Intent.DANGER : null}
        placeholder={placeholder}
        type={type}
      />
    </FormGroup>
  )
}

export default TextInput
