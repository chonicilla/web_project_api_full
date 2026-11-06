const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?#?$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} no es un correo electrónico válido`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg',
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es un enlace válido de avatar`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
