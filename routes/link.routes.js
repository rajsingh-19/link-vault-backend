const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const {
  deleteLinkHandler,
  createLinkHandler,
  updateLinkHandler,
  getLinkHandler,
  createClickHandler,
  getNoOfClicksForSocialLinksByUserIdHandler,
  getNoOfClicksForShopLinksByUserIdHandler,
  getMonthlyClicksByUserIdHandler,
  getClicksByUserDeviceHandler,
  getLinksForSocialByUserIdHandler,
  getLinksForShopByUserIdHandler,
  getClicksByAppTypeForSocialLinksHandler,
  getTopLinksByClicksHandler,
} = require('../controller/link.Controller');

// link route
router.post('/createLink/:userId', verifyUser, createLinkHandler);
router.put('/updateLink/:id', verifyUser, updateLinkHandler);
router.delete('/deleteLink/:id', verifyUser, deleteLinkHandler);
router.get('/getLink/:id', getLinkHandler);
router.get(
  '/getAllLinksForSocial/:userId',
  getLinksForSocialByUserIdHandler
);
router.get(
  '/getAllLinksForShop/:userId',
  getLinksForShopByUserIdHandler
);
router.get('/:linkId', createClickHandler);
router.get(
  '/getNoOfClicksForSocial/:userId',
  getNoOfClicksForSocialLinksByUserIdHandler
);
router.get(
  '/getNoOfClicksForShop/:userId',
  getNoOfClicksForShopLinksByUserIdHandler
);
router.get('/getMonthlyClicks/:userId', getMonthlyClicksByUserIdHandler);
router.get('/getUserDeviceClicks/:userId', getClicksByUserDeviceHandler);
router.get(
  '/getAppTypeClicks/:userId',
  getClicksByAppTypeForSocialLinksHandler
);
router.get('/getTopLinks/:userId', getTopLinksByClicksHandler);

module.exports = router;
