import * as React from 'react'
// src/log.js
let counter = 0
const log = BaseComponent => props => {
  counter++
  console.log(counter)
  console.log(`Rendering ${BaseComponent.name}`)
  return <BaseComponent {...props} />
 }
 export default log