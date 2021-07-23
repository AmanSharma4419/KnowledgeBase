require('dotenv').config();
const path = require('path');
const projectRoot = path.join(__dirname, '..');
module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT || '',
  PROJECT_NAME: process.env.PROJECT_NAME || '',
  PROJECT_ROOT: projectRoot,
  PORT: process.env.PORT || '',
  MONGODB_URL: process.env.MONGODB_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  SMTP_SENDER: process.env.SMTP_SENDER || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT || '',
  SMTP_SENDER_NAME: process.env.SMTP_SENDER_NAME || '',
  EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME || '',
  SENDER_EMAIL: process.env.SENDER_EMAIL || '',
  SENDER_API_KEY: process.env.SENDER_API_KEY || '',
};

