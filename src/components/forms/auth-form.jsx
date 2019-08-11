import React from 'react'
import {connect} from 'react-redux'
import {fetchSignIn, authStatus} from "../../store/auth"
import {Form, Field} from 'react-final-form'
import {Button, Intent, Callout} from '@blueprintjs/core'
import TextInput from '../common/text-input'
import {required} from '../../utils/validate'

class AuthForm extends React.Component {

  handleSubmit = values => {
    this.props.submit(values)
  }

  render() {
    const {auth} = this.props
    return <section>
      {auth && <React.Fragment>
        <Callout>Вы успешно авторизованы.</Callout>
        <Button
          intent={Intent.DANGER}
          fill
          onClick={() => this.props.submit({"name": "dummy", "password": "dummy"})}
          text="Выйти"
          title="Выйти из аккаунта" />
      </React.Fragment>}
      {!auth && <React.Fragment>
        <Form
        onSubmit={this.handleSubmit}
        render={({
                   handleSubmit,
                   submitting,
                   invalid,
                 }) => (
          <form onSubmit={handleSubmit} className='form'>
            <Field
              type='text'
              name='name'
              component={TextInput}
              validate={required}
              label='Логин'
              placeholder='guest'/>
            <Field
              type='password'
              name='password'
              component={TextInput}
              validate={required}
              label='Пароль'/>
            <Button
              type='submit'
              disabled={submitting || invalid}
              fill
              title="Подтвердить логин и пароль"
              intent={Intent.SUCCESS}
              text="Войти"/>
          </form>
        )}/>
      </React.Fragment>}
    </section>
  }
}

const mapStateToProps = (state) => ({auth: authStatus(state)})

export default connect(mapStateToProps, {
  submit: fetchSignIn
})(AuthForm)