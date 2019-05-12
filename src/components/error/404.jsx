import React from 'react'
import {NonIdealState} from '@blueprintjs/core'
import LinkButton from '../common/link-button'

const Page404 = () => {

  const action = (
    <LinkButton to="/" 
      text="На главную" 
      className="btn btn--blue" />
  )

  return (
    <NonIdealState
      icon='error'
      title="Ошибка 404"
      description='Страница не найдена, проверьте URL'
      action={action}
    />
  );
}

export default Page404;