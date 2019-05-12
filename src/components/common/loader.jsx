import React from 'react'
import {Spinner, Intent} from '@blueprintjs/core'

const Loader = () => {
  return (
    <div style={{margin: '10rem'}}>
      <Spinner intent={Intent.PRIMARY} size={100} />
    </div>
  );
}

export default Loader;