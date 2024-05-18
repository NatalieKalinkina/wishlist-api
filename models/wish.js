const mongoose = require('mongoose');
const { isURL } = require('validator');

const wishSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  price: {
    type: number,
    required: true,
  },
  reserved: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('wish', wishSchema);
