import React from 'react'
import {connect} from 'react-redux'
import {Motion, spring} from 'react-motion'
import LinkButton from '../common/link-button'
import AuthForm from '../forms/auth-form'

const HomePage = () => {
  return <div className="home-page">
    <Motion defaultStyle={{x: 300, opacity: 0}}
            style={{x: spring(0), opacity: spring(1)}}>
      {style => (
        <div className="container flex-end" style={{
          opacity: style.opacity,
          transform: `translateX(${style.x}px)`
        }}>
          <section className="content">
            <h1 className="head-1 mb-2"><span
              className="text-initial">M</span>иртелеком <span
              className="text-initial">M</span>ененджер</h1>
            <AuthForm/>
            <nav className="home-page__navigation">
              <LinkButton
                title="Перейти на страницу"
                to='/equipments/dashboard/table'
                className="home-page__link"
                text="Оборудование"
                large
                minimal/>
              <LinkButton
                title="Перейти на страницу"
                to='/clients'
                className="home-page__link"
                text="Клиенты"
                large
                minimal/>
            </nav>
            <img src="assets/logo.svg" alt="Миртелеком главный логотип"
                 className="logo"/>
          </section>
        </div>
      )}
    </Motion>
  </div>
}

const mapStateToProps = (state) => ({auth: state.auth})

export default connect(mapStateToProps)(HomePage)