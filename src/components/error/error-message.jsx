import * as React from 'react'
import {NonIdealState} from '@blueprintjs/core'

const ErrorMessage = ({
  icon,
  title,
  desc = null
}) => <NonIdealState
  icon={icon}
  title={title}
  desc={desc}
/>

export default ErrorMessage