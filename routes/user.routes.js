const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const {
  incrementCtaCountHandler,
  registerHandler,
  loginHandler,
  nameCategoryHandler,
  infoHandler,
  updateHandler,
  updateUserInfoHandler,
  getCtaCountHandler,
} = require('../controller/user.Controller');

//      register route
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.put('/namecategory/:userId', verifyUser, nameCategoryHandler);
router.get('/info/:userId', verifyUser, infoHandler);
router.get('/cta/:userId', verifyUser, getCtaCountHandler);
router.put('/increment/:userId', verifyUser, incrementCtaCountHandler);
router.put('/update/:userId', verifyUser, updateHandler);
router.put('/updateUserInfo/:userId', verifyUser, updateUserInfoHandler)

module.exports = router;
