const LinksModel = require('../models/links.Schema');

const createLink = async (title, url, linkCategory, appType, userId) => {
  if (!title || !url || !linkCategory || !userId) {
    const error = new Error('Missing required fields');
    error.status = 400;
    throw error;
  }

  if (linkCategory === 'link' && !appType) {
    const error = new Error('appType is required for link links');
    error.status = 400;
    throw error;
  }

  const newLink = await LinksModel.create({
    title,
    url,
    linkCategory,
    appType,
    userId,
  });
  return newLink;
};

const updateLink = async (id, updateData) => {
  const link = await LinksModel.findById(id);
  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  if (updateData.linkCategory === 'link' && !updateData.appType) {
    const error = new Error('appType is required for link');
    error.status = 400;
    throw error;
  }

  const updatedLink = await LinksModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedLink;
};

const deleteLink = async (id) => {
  const link = await LinksModel.findById(id);
  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  await LinksModel.findByIdAndDelete(id);
};

const getLink = async (id) => {
  const link = await LinksModel.findById(id);
  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  return link;
};

const createClick = async (linkId, { userDevice, ipAddress }) => {
  const link = await LinksModel.findById(linkId);
  if (!link) {
    const error = new Error('Link not found');
    error.status = 404;
    throw error;
  }

  const newClick = { userDevice, ipAddress, clickedAt: new Date() };
  link.clicks.push(newClick);

  await link.save();
  return link.url;
};

const getNoOfClicksForSocialLinksByUserId = async (userId) => {
  const userLinks = await LinksModel.find({ userId, linkCategory: 'link' });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  const totalClicks = userLinks.reduce(
    (sum, link) => sum + (link.clicks ? link.clicks.length : 0),
    0
  );

  return totalClicks;
};

const getLinksForSocialByUserId = async (userId) => {
  const userLinks = await LinksModel.find({ userId, linkCategory: 'link' });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  return userLinks;
};

const getLinksForShopByUserId = async (userId) => {
  const userLinks = await LinksModel.find({ userId, linkCategory: 'shop' });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No shop links found for the user');
    error.status = 404;
    throw error;
  }

  return userLinks;
};

const getNoOfClicksForShopLinksByUserId = async (userId) => {
  const userLinks = await LinksModel.find({ userId, linkCategory: 'shop' });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No shop links found for the user');
    error.status = 404;
    throw error;
  }

  const totalClicks = userLinks.reduce(
    (sum, link) => sum + (link.clicks ? link.clicks.length : 0),
    0
  );

  return totalClicks;
};

const getMonthlyClicksByUserId = async (userId) => {
  const userLinks = await LinksModel.find({ userId });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  // Initialize all months with 0 clicks
  const monthlyClicks = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  userLinks.forEach((link) => {
    link.clicks.forEach((click) => {
      const month = new Date(click.clickedAt).toLocaleString('default', {
        month: 'short',
      });

      monthlyClicks[month] += 1;
    });
  });

  return monthlyClicks;
};

const getClicksByUserDevice = async (userId) => {
  const userLinks = await LinksModel.find({ userId });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  const deviceClicks = {};

  userLinks.forEach((link) => {
    link.clicks.forEach((click) => {
      const device = click.userDevice; // Extract userDevice (e.g., "Mobile", "Desktop")

      if (!deviceClicks[device]) {
        deviceClicks[device] = 0;
      }

      deviceClicks[device] += 1;
    });
  });

  return deviceClicks;
};

const getClicksByAppTypeForSocialLinks = async (userId) => {
  // Fetch all links associated with the userId where linkCategory is 'Social'
  const socialLinks = await LinksModel.find({ userId, linkCategory: 'link' });

  if (!socialLinks || socialLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  const appTypeClicks = {};

  socialLinks.forEach((link) => {
    const appType = link.appType; // Extract appType (e.g., "Instagram", "Facebook", etc.)

    if (!appTypeClicks[appType]) {
      appTypeClicks[appType] = 0;
    }

    appTypeClicks[appType] += link.clicks.length;
  });

  return appTypeClicks;
};

const getTopLinksByClicks = async (userId) => {
  // Fetch all links associated with the userId
  const userLinks = await LinksModel.find({ userId });

  if (!userLinks || userLinks.length === 0) {
    const error = new Error('No links found for the user');
    error.status = 404;
    throw error;
  }

  // Map links with their click count
  const linksWithClicks = userLinks.map((link) => ({
    title: link.title,
    noOfClicks: link.clicks.length,
  }));

  // Sort links by noOfClicks in descending order
  linksWithClicks.sort((a, b) => b.noOfClicks - a.noOfClicks);

  // Return the top 6 links (or fewer if there aren't 6)
  return linksWithClicks.slice(0, 6);
};

module.exports = {
  createLink,
  updateLink,
  deleteLink,
  getLink,
  createClick,
  getNoOfClicksForSocialLinksByUserId,
  getNoOfClicksForShopLinksByUserId,
  getMonthlyClicksByUserId,
  getClicksByUserDevice,
  getClicksByAppTypeForSocialLinks,
  getTopLinksByClicks,
  getLinksForSocialByUserId,
  getLinksForShopByUserId,
};
