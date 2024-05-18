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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wish',
    default: [],
  }],
});

module.exports = mongoose.model('wishlist', wishlistSchema);
