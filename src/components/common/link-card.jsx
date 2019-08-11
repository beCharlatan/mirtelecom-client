import React from 'react'
import {
  Card,
  Tag,
  Intent
} from "@blueprintjs/core"

const LinkCard = ({item}) => {
  const {title, tag, desc, href} = item
  const goToLink = (href) => () => window.open(href, '_blank')
  return <Card
    onClick={goToLink(href)}
    className="list-item no-flex"
    interactive={true}>
    <h3>{title}
      <Tag
        className="tag--default"
        intent={Intent.PRIMARY}  
      >{tag}</Tag>
    </h3>
    <p>{desc}</p>
  </Card>
}

export default LinkCard