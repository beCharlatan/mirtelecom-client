import React from 'react'
import LinkCard from '../common/link-card'

const links = [
  {
    title: 'OSPInsightFTI',
    tag: 'приложение',
    desc: 'Система мониторинга ВОК',
    href: 'http://10.141.11.3/ospinsightfti8/#'
  },
  {
    title: 'Схема АО МирТелеКом имени Э.К. Первышина',
    tag: 'JPG',
    desc: false,
    href: 'http://172.16.13.250/doc/plane-mtk.jpg'
  },
  {
    title: 'Схема Энергокомплекса',
    tag: 'JPG',
    desc: false,
    href: 'http://172.16.13.250/doc/plane-ec.jpg'
  },
  {
    title: 'ПС Энергокомплекса',
    tag: 'link',
    desc: 'Схема Яндекс.КонструкторКарт всех ВОЛС и подстанций',
    href: 'https://yandex.ru/maps/?ll=37.494752%2C55.618286&mode=usermaps&source=constructorLink&um=constructor%3A4d4aa7ef51c7158954cac25167d53246d7393f88c78b5c9a65eee5d380a2ff00&z=11'
  },
  {
    title: 'Официальный сайт АО МирТелеКом',
    tag: 'сайт',
    desc: 'www.mirtelecom.biz',
    href: 'http://mirtelecom.biz'
  },
]

const LinksPage = () => {
  return <section className="container">
    <div className="card__header">
      <h1 className="card__title">Ссылки и документы</h1>
    </div>
    {
      links.map((i, idx) => <LinkCard key={idx} item={i} />)
    }
  </section>
}

export default LinksPage