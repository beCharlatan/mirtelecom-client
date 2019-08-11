import React from 'react'
import {Switch} from '@blueprintjs/core'

const SwitchInput = ({input, type, label}) => {
  return <Switch
    {...input}
    type={type}
    label={label} />
}

export default SwitchInput
