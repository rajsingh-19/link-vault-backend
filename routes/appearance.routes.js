const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const {
  createAppearanceHandler,
  updateAppearanceHandler,
  getAppearanceByUserIdHandler,
} = require('../controller/appearance.Controller');

// appearance router
router.post('/create/:userId', verifyUser, createAppearanceHandler);
router.put('/update/:userId', verifyUser, updateAppearanceHandler);
router.get('/get/:userId', verifyUser, getAppearanceByUserIdHandler);

module.exports = router;
