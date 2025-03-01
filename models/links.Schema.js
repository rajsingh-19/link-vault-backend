const mongoose = require('mongoose');
const clickSchema = require('./clicks.Schema');

const linksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    linkCategory: {
      type: String,
      enum: ['link', 'shop'],
      required: true,
    },
    appType: {
      type: String,
      enum: ['Instagram', 'FaceBook', 'YouTube', 'Twitter'],
      validate: {
        validator: function () {
          return this.linkCategory === 'link';
        },
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clicks: {
      type: [clickSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const LinksModel = mongoose.model('Links', linksSchema);

module.exports = LinksModel;
