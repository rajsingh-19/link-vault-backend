const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
      enum: ['Stack', 'Grid', 'Carousel'],
      default: 'Stack',
      required: false
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
        enum: ['', 'sp1', 'sp2', 'sp3', 'sp4', 'sp5', 'sp6'],
        default: '',
        required: false
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
        '#FFFFFF',
        '#EBEEF1',
        '#2A3235',
        '#000000',
        '#E0F6FF',
        '#E0FAEE',
        '#FFEEE2',
        '#FFF8E0'
      ],
      default: null,
      required: false,
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
