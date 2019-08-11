const required = value => {
  if (!value) return "Это поле не должно оставаться пустым"
}
const isGreaterThan = lng => value => {
  if (value && value.length > lng) return `Это поле должно быть не более ${lng} символов`
}

const ipRegEx = value => {
  const regEx = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/
  if ( value && !value.match(regEx)) return `Формат IP адреса: [0.0.0.0] - [255.255.255.255]`
}

export {
  required,
  isGreaterThan,
  ipRegEx
}