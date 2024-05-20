const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  deadline: {
    type: Date,
    validate: {
      validator(v) {
        return v > Date.now();
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
  wishes: [{
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
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('wishlist', wishlistSchema);
