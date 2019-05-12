import React from 'react';

const {
  Provider: MirtelecomServiceProvider,
  Consumer: MirtelecomServiceConsumer
} = React.createContext();

export {
  MirtelecomServiceConsumer,
  MirtelecomServiceProvider
};