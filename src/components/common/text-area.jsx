import React from 'react';
import {FormGroup, TextArea} from '@blueprintjs/core';

const TextAreaInput = ({input, placeholder, rows, label, meta: {touched, error}}) => {
  return (
    <FormGroup
      label={label}
      >
      <TextArea
        {...input}
        placeholder={placeholder}
        rows={rows}
        fill
      />
    </FormGroup>
  )
}

// TextAreaInput.defaultProps = {
//   type: 'text',
//   error: '',
//   required: false,
//   autoComplete: 'off',
//   labelClass: '',
//   inputClass: '',
// };

// TextAreaInput.propTypes = {
//   value: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   error: PropTypes.string,
//   type: PropTypes.string,
//   required: PropTypes.bool,
//   autoComplete: PropTypes.string,
//   labelClass: PropTypes.string,
//   inputClass: PropTypes.string,
// };

export default TextAreaInput;
