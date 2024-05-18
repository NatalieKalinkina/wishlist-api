const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  deadline: {
    type: Date,

  },
  wishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wish',
    default: [],
  }],
});

module.exports = mongoose.model('wishlist', wishlistSchema);
