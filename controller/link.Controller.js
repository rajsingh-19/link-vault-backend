const dotenv = require('dotenv');
const useragent = require('useragent');
const {
  createLink,
  updateLink,
  deleteLink,
  getLink,
  createClick,
  getNoOfClicksForSocialLinksByUserId,
  getNoOfClicksForShopLinksByUserId,
  getTopLinksByClicks,
  getClicksByAppTypeForSocialLinks,
  getClicksByUserDevice,
  getMonthlyClicksByUserId,
  getLinksForShopByUserId,
  getLinksForSocialByUserId,
} = require('../services/link.service');

dotenv.config();

const createLinkHandler = async (req, res) => {
  const { userId } = req.params;
  const { title, url, linkCategory, appType } = req.body;

  try {
    const newLink = await createLink(title, url, linkCategory, appType, userId);
    return res
      .status(201)
      .json({ message: 'Link created successfully', data: newLink });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const updateLinkHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedLink = await updateLink(id, updateData);
    return res
      .status(200)
      .json({ message: 'Link updated successfully', data: updatedLink });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const deleteLinkHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteLink(id);
    return res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getLinkHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await getLink(id);
    return res
      .status(200)
      .json({ message: 'Link retrieved successfully', data: link });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const createClickHandler = async (req, res) => {
  const { linkId } = req.params;

  // Extract IP address from the request
  const ipAddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const cleanedIpAddress = ipAddress && ipAddress.split(',')[0].trim(); // Handle the forwarded IP chain

  // Extract device information (user agent) from the request
  const userAgent = req.headers['user-agent'];

  // Use useragent library to parse the user agent string
  const agent = useragent.parse(userAgent);

  // Check the device type (Android, iOS, Desktop)
  let userDevice = 'Unknown Device';

  // Access the OS family
  const osFamily = agent.os.family ? agent.os.family.toLowerCase() : null;

  console.log(agent.os);

  if (osFamily) {
    if (osFamily === 'android') {
      userDevice = 'android';
    } else if (osFamily === 'ios') {
      userDevice = 'ios';
    } else if (osFamily === 'mac os x') {
      userDevice = 'mac';
    } else {
      userDevice = 'Windows';
    }
  }

  if (!linkId || !userDevice || !cleanedIpAddress) {
    return res.status(400).json({
      message: 'Link Id, userDevice, and IP address are required',
    });
  }

  try {
    // Add click to the database
    const originalUrl = await createClick(linkId, {
      userDevice, // Should be a string, not an object
      ipAddress: cleanedIpAddress, // Ensure it's not undefined
    });

    return res.json({ redirectUrl: originalUrl });
    // return res.redirect(originalUrl);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getNoOfClicksForSocialLinksByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalClicks = await getNoOfClicksForSocialLinksByUserId(userId);
    return res
      .status(200)
      .json({ message: 'Total clicks retrieved successfully', totalClicks });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getNoOfClicksForShopLinksByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalClicks = await getNoOfClicksForShopLinksByUserId(userId);
    return res
      .status(200)
      .json({ message: 'Total clicks retrieved successfully', totalClicks });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getLinksForShopByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalLinks = await getLinksForShopByUserId(userId);
    return res
      .status(200)
      .json({ message: 'Total links retrieved successfully', totalLinks });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getLinksForSocialByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalLinks = await getLinksForSocialByUserId(userId);
    return res
      .status(200)
      .json({ message: 'Total links retrieved successfully', totalLinks });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getMonthlyClicksByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const monthlyClicks = await getMonthlyClicksByUserId(userId);
    return res.status(200).json({
      message: 'Monthly clicks retrieved successfully',
      monthlyClicks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getClicksByUserDeviceHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const deviceClicks = await getClicksByUserDevice(userId);
    return res.status(200).json({
      message: 'Clicks by user device retrieved successfully',
      deviceClicks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getClicksByAppTypeForSocialLinksHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const appTypeClicks = await getClicksByAppTypeForSocialLinks(userId);
    return res.status(200).json({
      message: 'Clicks by app type retrieved successfully',
      appTypeClicks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

const getTopLinksByClicksHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const topLinks = await getTopLinksByClicks(userId);
    return res
      .status(200)
      .json({ message: 'Top links retrieved successfully', topLinks });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || 'An error occurred' });
  }
};

module.exports = {
  createLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
  getLinkHandler,
  createClickHandler,
  getNoOfClicksForSocialLinksByUserIdHandler,
  getNoOfClicksForShopLinksByUserIdHandler,
  getMonthlyClicksByUserIdHandler,
  getClicksByUserDeviceHandler,
  getClicksByAppTypeForSocialLinksHandler,
  getTopLinksByClicksHandler,
  getLinksForShopByUserIdHandler,
  getLinksForSocialByUserIdHandler,
};