const AppearanceModel = require('../models/appearance.Schema');

const createAppearance = async (layout, buttons, fonts, themes, userId) => {
  if (!userId) {
    const error = new Error('User ID is required');
    error.status = 400;
    throw error;
  }

  const newAppearance = await AppearanceModel.create({
    layout,
    buttons,
    fonts,
    themes,
    userId,
  });
  return newAppearance;
};

const updateAppearance = async (userId, updateData) => {
  const appearance = await AppearanceModel.findOne({ userId });
  if (!appearance) {
    const error = new Error('Appearance not found');
    error.status = 404;
    throw error;
  }

  const updatedAppearance = await AppearanceModel.findOneAndUpdate(
    { userId },
    updateData,
    { new: true }
  );
  return updatedAppearance;
};

const getAppearanceByUserId = async (userId) => {
  const appearance = await AppearanceModel.findOne({ userId });
  if (!appearance) {
    const error = new Error('Appearance not found');
    error.status = 404;
    throw error;
  }

  return appearance;
};

module.exports = { createAppearance, updateAppearance, getAppearanceByUserId };
