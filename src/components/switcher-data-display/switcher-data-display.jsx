import * as React from 'react'
import {ButtonGroup, Button} from '@blueprintjs/core'
import {Icon} from "@blueprintjs/core"

const SwitcherDataDisplay = ({
  options,
  action,
  current
}) => {
  return <ButtonGroup minimal>
    {
      options.map((i, id) => (
        <Button
          title={i.title}
          key={id}
          onClick={() => action(i.value)}
          active={current === i.value}>
          <Icon icon={i && i.icon} />
        </Button>
      ))
    }
  </ButtonGroup>
}

export default SwitcherDataDisplay
