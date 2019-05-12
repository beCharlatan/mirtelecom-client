import {required, isGreaterThan} from './validate'
import {composeValidators} from "./index"
import TextInput from '../components/common/text-input'
import TextAreaInput from '../components/common/text-area'

export const equipmentFormMask = [
  {
    type: 'text',
    name: 'name',
    component: TextInput,
    validate: composeValidators(required, isGreaterThan(30)),
    label: 'Наименование',
    placeholder: 'StrBB',
  },
  {
    type: 'text',
    name: 'address',
    component: TextInput,
    validate: required,
    label: 'Адрес',
    placeholder: 'Москва, Гороховский пер., 4'
  },
  {
    type: 'text',
    name: 'equipment',
    component: TextInput,
    validate: composeValidators(required, isGreaterThan(30)),
    label: 'Оборудование',
    placeholder: 'Stack'
  },
  {
    type: 'text',
    name: 'status',
    component: TextInput,
    validate: isGreaterThan(10),
    label: 'Статус',
    placeholder: 'МТК'
  },
  {
    type: 'text',
    name: 'ip',
    component: TextInput,
    validate: isGreaterThan(30),
    label: 'IP адрес',
    placeholder: '127.0.0.1'
  },
  {
    type: 'text',
    name: 'sn',
    component: TextInput,
    validate: composeValidators(required, isGreaterThan(30)),
    label: '№ серии',
    placeholder: '000000000'
  },
  {
    name: 'note',
    rows: 3,
    component: TextAreaInput,
    label: 'Примечание',
    placeholder: 'type something...',
  }
]