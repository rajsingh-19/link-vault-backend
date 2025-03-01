const dotenv = require('dotenv');
const {
  registerUser,
  loginUser,
  nameCategory,
  infoUser,
  updateUser,
  getCtaCount,
  updateUserInfo,
  incrementCtaCount,
} = require('../services/user.service');

dotenv.config();

//          register handler
const registerHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //  Check if the user exists in the db
    const result = await registerUser(firstName, lastName, email, password);

    return res.status(201).json({ message: 'Registered Successfully' });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An error occured' });
  }
};

//          login handler
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);

    return res.status(200).json({ message: 'Logged in Successfully', result });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An Error Occured' });
  }
};

//          username and category handler
const nameCategoryHandler = async (req, res) => {
  const { userId } = req.params;
  const { userName, category } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid' });
  }

  try {
    //  Check if the user exists in the db
    const result = await nameCategory(userId, userName, category);

    const username = result.userName;

    return res
      .status(201)
      .json({ message: 'User Info updated Successfully', result: userName });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An error occured' });
  }
};

//          user info handler
const infoHandler = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid' });
  }

  try {
    const userInfo = await infoUser(userId);

    return res
      .status(200)
      .json({ message: 'Fetched user info.', result: userInfo });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An error occured' });
  }
};

//          user update handler
const updateHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { userId } = req.params;

  if (!firstName && !lastName && !email && !password) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid' });
  }

  //      Try Catch block for error handling
  try {
    //  Check if the user exists in the db
    const result = await updateUser(
      firstName,
      lastName,
      email,
      password,
      userId
    );

    return res.status(200).json({ message: 'Details Updated Successfully' });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An error occured' });
  }
};

//        cta increment handler
const incrementCtaCountHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await incrementCtaCount(userId);
    return res
      .status(200)
      .json({ message: 'CTA count updated successfully', data: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

//        user info update handler
const updateUserInfoHandler = async (req, res) => {
  const { userId } = req.params;
  const { bio, bannerColor, profileImgUrl } = req.body; 

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid' });
  };

  try {
    const result = await updateUserInfo(userId, bio, bannerColor, profileImgUrl);
    return res.status(200).json({message: "User Information Updated"})
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    };

    return res.status(500).json({ message: 'An error occured' });
  }
};

const getCtaCountHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const ctaCount = await getCtaCount(userId);
    return res
      .status(200)
      .json({ message: 'CTA count retrieved successfully', data: ctaCount });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  nameCategoryHandler,
  infoHandler,
  updateHandler,
  incrementCtaCountHandler,
  updateUserInfoHandler,
  getCtaCountHandler,
};
