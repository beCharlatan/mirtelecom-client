import React from 'react';
import {MirtelecomServiceConsumer} from '../context/mirtelecom-service-context';

const withMirtelecomService = () => (Wrapped) => {

  return (props) => {
    return (
      <MirtelecomServiceConsumer>
        {
          (mirtelecomService) => {
            return (<Wrapped {...props} 
              mirtelecomService={mirtelecomService} />)
          }
        }
      </MirtelecomServiceConsumer>
    )
  }
}

export default withMirtelecomService