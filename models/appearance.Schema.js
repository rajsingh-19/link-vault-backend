const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
      enum: ['Stack', 'Grid', 'Carousel'],
    },
    buttons: {
      fill: {
        type: String,
      },
      outline: {
        type: String,
      },
      hardShadow: {
        type: String,
      },
      softShadow: {
        type: String,
      },
      special: {
        type: String,
        enum: ['sp1', 'sp2', 'sp3', 'sp4', 'sp5', 'sp6'],
      },
      btnColor: {
        type: String,
      },
      btnFontColor: {
        type: String,
      },
    },
    fonts: {
      font: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    themes: {
      type: String,
      enum: [
        'Air Snow',
        'Air Grey',
        'Air Smoke',
        'Air Black',
        'Mineral Blue',
        'Mineral Green',
        'Mineral Orange',
        'Mineral Yellow',
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AppearanceModel = mongoose.model('Appearance', appearanceSchema);

module.exports = AppearanceModel;
