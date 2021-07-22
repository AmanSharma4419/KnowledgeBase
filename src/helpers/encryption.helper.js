const crypto = require('crypto');

const { JWT_SECRET } = require('./../appConfig');

module.exports.generateHash = ({ value }) => {
  const hash = crypto.createHmac('sha512', JWT_SECRET);
  hash.update(value);
  const hashString = hash.digest('hex');

  return hashString;
};
