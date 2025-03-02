const {
  createAppearance,
  updateAppearance,
  getAppearanceByUserId,
} = require('../services/appearance.service');

const createAppearanceHandler = async (req, res) => {
  const { layout, buttons, fonts, themes, userId } = req.body;

  try {
    const appearance = await createAppearance(
      layout,
      buttons,
      fonts,
      themes,
      userId
    );
    return res
      .status(201)
      .json({ message: 'Appearance created successfully', data: appearance });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const updateAppearanceHandler = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    const updatedAppearance = await updateAppearance(userId, updateData);
    return res.status(200).json({
      message: 'Appearance updated successfully',
      data: updatedAppearance,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getAppearanceByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const appearance = await getAppearanceByUserId(userId);
    return res
      .status(200)
      .json({ message: 'Appearance retrieved successfully', data: appearance });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

module.exports = {
  createAppearanceHandler,
  updateAppearanceHandler,
  getAppearanceByUserIdHandler,
};