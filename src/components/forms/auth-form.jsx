import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchSignIn} from "../../redux"
import {compose} from "../../utils"
import withMirtelecomService from '../../HOC/with-mirtelecom-service'
import {Form, Field} from 'react-final-form'
import {Button, Card, Intent, NonIdealState} from '@blueprintjs/core'
import TextInput from '../common/text-input'
import {required} from '../../utils/validate'

class AuthForm extends React.Component {

  handleSubmit = values => {
    this.props.submit(values)
  };

  render() {
    const {auth} = this.props
    const SignOut = (
      <Button
        className="btn btn--blue"
        onClick={() => this.props.submit({"name": "", "password": ""})}
        text="Выйти"
        title="Выйти из аккаунта"
        icon="log-out" />
    )
    return <section className="auth-form">
      {auth &&
      <Card elevation={2} className="home-page__auth-card">
        <NonIdealState
          icon="user"
          title="Добро пожаловать!"
          description="Вы были успешно авторизованы"
          action={SignOut}
        />
      </Card>}
      {!auth && <Form
        onSubmit={this.handleSubmit}
        render={({
                   handleSubmit,
                   submitting,
                   pristine,
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
              className='btn btn--blue auth-form__btn'
              disabled={submitting || pristine || invalid}
              large
              title="Подтвердить логин и пароль"
              intent={Intent.PRIMARY}
              text="Войти"/>
            <p>Войдите, что получить полный доступ к программме</p>
          </form>
        )}/>}
    </section>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch, {mirtelecomService}) => {
  return bindActionCreators({
    submit: fetchSignIn(mirtelecomService)
  }, dispatch)
}


export default compose(
  withMirtelecomService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthForm)