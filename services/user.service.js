const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/user.Schema');

dotenv.config();

//      api service for user register
const registerUser = async (firstName, lastName, email, password) => {
  const isUserExist = await UserModel.findOne({ email });

  console.log("before");

  if (isUserExist) {
    const error = new Error('A User already exist with this email');
    error.status = 400;
    throw error; //Throwing the error to the controller
  }

  console.log("after");
  
  //  Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  return newUser; // Return created user object
};

//      api service for user login
const loginUser = async (email, password) => {
  const isUserValid = await UserModel.findOne({ email });

  if (!isUserValid) {
    const error = new Error('This email is not associated with any account');
    error.status = 400;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, isUserValid.password);

  if (!isPasswordValid) {
    const error = new Error('Credential is wrong');
    error.status = 400;
    throw error;
  }

  //   Set the mongodb user id as payload
  const payload = {
    id: isUserValid._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return {
    token,
    userId: isUserValid._id,
    firstName: isUserValid.firstName,
    lastName: isUserValid.lastName,
    email: isUserValid.email,
    userName: isUserValid.userName,
  };
};

//    api service for user-name and category
const nameCategory = async (userId, userName, category) => {
  const isUserExist = await UserModel.findById(userId);

  if (!isUserExist) {
    const error = new Error('A User already exist with this email');
    error.status = 400;
    throw error; //Throwing the error to the controller
  }

  // add userName if provided
  if (userName) {
    isUserExist.userName = userName;
  }

  // add category if provided
  if (category) {
    isUserExist.category = category;
  }

  const result = await isUserExist.save();

  return result;
};

//    api service for fetching the user info
const infoUser = async (userId) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    const error = new Error('This User is not associated with any account');
    error.status = 404;
    throw error;
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userId: user._id,
    profileImgUrl: user.profileImgUrl,
    bio: user.bio,
    bannerColor: user.bannerColor,
    userName: user.userName
  };
};

//      api service for update the user
const updateUser = async (firstName, lastName, email, password, userId) => {
  const isUserValid = await UserModel.findById(userId);

  if (!isUserValid) {
    const error = new Error('This User is not associated with any account');
    error.status = 400;
    throw error;
  }

  // Update firstName if new provided
  if (firstName) {
    isUserValid.firstName = firstName;
  }

  // Update lastName if new provided
  if (lastName) {
    isUserValid.lastName = lastName;
  }

  // Update email if new provided
  if (email) {
    isUserValid.email = email;
  }

  // Update the mobile if new provided
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    isUserValid.password = hashPassword;
  }

  const result = await isUserValid.save();
  return result;
};

//      api for increase the cta count
const incrementCtaCount = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  };

  user.ctaCounts = (user.ctaCounts || 0) + 1;
  await user.save();

  return user;
};

//      api for update the user info - image, bio and bgcolor
const updateUserInfo = async (userId, bio, bannerColor, profileImgUrl) => {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  };

  // Update bio if provided
  if (bio) {
    user.bio = bio;
  };

  // update bannerColor if provided
  if(bannerColor) {
    user.bannerColor = bannerColor;
  };

  // update profileImgUrl if provided
  if(profileImgUrl) {
    user.profileImgUrl = profileImgUrl;
  };

  await user.save();
  return user;
};

const getCtaCount = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  };

  return { ctaCounts: user.ctaCounts || 0 };
};

module.exports = {
  registerUser,
  loginUser,
  nameCategory,
  updateUser,
  infoUser,
  incrementCtaCount,
  updateUserInfo,
  getCtaCount,
};
