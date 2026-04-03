require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || '';
const profileUploadFolder = process.env.CLOUDINARY_PROFILE_FOLDER || 'profile_inventory_system';

const hasCloudinaryConfig = Boolean(cloudName && apiKey && apiSecret);

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

cloudinary.hasCloudinaryConfig = hasCloudinaryConfig;
cloudinary.uploadPreset = uploadPreset;
cloudinary.profileUploadFolder = profileUploadFolder;

module.exports = cloudinary;