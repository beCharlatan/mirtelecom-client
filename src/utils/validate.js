const required = value => {
  if (!value) return "Это поле не должно оставаться пустым"
}
const isGreaterThan = lng => value => {
  if (value && value.length > lng) return `Это поле должно быть не более ${lng} символов`
}

export {
  required,
  isGreaterThan
}