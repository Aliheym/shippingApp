import validator from 'validator';

const errorMessages = {
  required: 'Required field',
  lengthRange: 'Invalid field length',
  isEmail: 'Invalid email',
  isIn: 'Invalid value',
  isPhone: 'Invalid phone number'
};

export default {
  required: value =>
    !validator.isEmpty(value) ? false : errorMessages.required,
  lengthRange: (min, max) => value =>
    validator.isLength(value, { min, max }) ? false : errorMessages.lengthRange,
  isEmail: value => (validator.isEmail(value) ? false : errorMessages.isEmail),
  isIn: values => value =>
    validator.isIn(value, values) ? false : errorMessages.isIn,
  isPhone: value =>
    validator.isMobilePhone(value, 'any', { strictMode: true })
      ? false
      : errorMessages.isPhone
};
