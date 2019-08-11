import * as React from 'react'
import {Spinner, Intent} from '@blueprintjs/core'

const Loader = () => <div style={{margin: '10rem'}}>
  <Spinner intent={Intent.PRIMARY} size={100} />
</div>

export default Loader