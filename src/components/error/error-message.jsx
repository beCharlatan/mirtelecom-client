import React from 'react';
import {NonIdealState} from '@blueprintjs/core';

const ErrorMessage = () => {
  return (
    <NonIdealState
      icon='error'
      title="Ошибка"
      description='Что-то пошло не так, попробуйте повторить операцию позже.'
    />
  );
}

export default ErrorMessage;