import * as React from 'react'
import {withRouter} from 'react-router'
import {Button} from '@blueprintjs/core'

const LinkButton = ({
  history,
  to,
  onClick,
  staticContext,
  ...rest
}) => <Button
  {...rest}
  onClick={(e) => {
    onClick && onClick(e)
    history.push(to)
  }}
/>

export default withRouter(LinkButton)