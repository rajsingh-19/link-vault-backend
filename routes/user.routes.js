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
router.get('/info/:userId', infoHandler);
router.get('/cta/:userId', getCtaCountHandler);
router.put('/increment/:userId', incrementCtaCountHandler);
router.put('/update/:userId', verifyUser, updateHandler);
router.put('/updateUserInfo/:userId', verifyUser, updateUserInfoHandler)

module.exports = router;
