const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      'Business',
      'Creative',
      'Education',
      'Entertainment',
      'Fashion & Beauty',
      'Food & Beverage',
      'Government & Politics',
      'Health & Wellness',
      'Non-Profit',
      'Other',
      'Tech',
      'Travel & Tourism',
    ],
  },
  bio: {
    type: String,
  },
  bannerColor: {
    type: String,
  },
  profileImgUrl: {
    type: String,
  },
  ctaCounts: {
    type: Number,
    default: 0,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
