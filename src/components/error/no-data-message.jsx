import React from 'react'
import {NonIdealState} from '@blueprintjs/core'

const NoDataMessage = ({icon, title, desc}) => {
  return (
    <NonIdealState
      icon={icon}
      title={title}
      description={desc}
    />
  );
}

export default NoDataMessage