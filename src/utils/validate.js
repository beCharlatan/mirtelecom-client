const required = value => {
  if (!value) return "Это поле не должно оставаться пустым"
}
const isGreaterThan = lng => value => {
  if (value && value.length > lng) return `Это поле должно быть не более ${lng} символов`
}

const ipRegEx = value => {
  const regEx = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  if ( value && !value.match(regEx)) return `Формат IP адреса: [0.0.0.0] - [999.999.999.999]`
}

export {
  required,
  isGreaterThan,
  ipRegEx
}