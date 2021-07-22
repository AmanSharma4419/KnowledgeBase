const jwt = require('jsonwebtoken');
const debug = require('debug')('app:jwtHelper');

const { JWT_SECRET } = require('./../appConfig');

module.exports.generateToken = async ({ data }) => {
  return new Promise(async (resolve, reject) => {
    jwt.sign(data, JWT_SECRET, (e, token) => {
      if (e) {
        debug(e);
        return reject(e);
      }

      return resolve(token);
    });
  });
};

module.exports.verifyToken = async ({ token }) => {
  return new Promise(async (resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (e, decoded) => {
      if (e) {
        debug(e);
        return reject(e);
      }

      return resolve(decoded);
    });
  });
};
