import React from 'react'
import cl from 'classnames'
import {FormGroup, InputGroup, Intent} from '@blueprintjs/core'

const TextInput = ({input, type, placeholder, label, min, max, meta: {touched, error}}) => {
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
        type={type}
        min={min}
        max={max}
        id={`id-${input.name}`}
        intent={touched && error ? Intent.DANGER : null}
        placeholder={placeholder}
      />
    </FormGroup>
  )
}

export default TextInput
