const debug = require("debug")("app:utilsHelper");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const appConfig = require("./../appConfig");

function _rand(min, max) {
  const random = Math.random();
  return Math.floor(random * (max - min) + min);
}

module.exports.checkEnvVariables = async () => {
  try {
    for (const variable of Object.keys(appConfig)) {
      if (
        appConfig[variable] === undefined ||
        appConfig[variable] === null ||
        appConfig[variable] === "" ||
        appConfig[variable].length === 0
      ) {
        debug(`Missing Config variable: ${variable}`);
      }
    }
  } catch (e) {
    debug(e);
  }
};

exports.comparedHased = async (password, hasedPass) => {
  return await bcrypt.compare(password, hasedPass);
};

module.exports.generateUniqueId = ({ prefix = "" } = {}) => {
  return `${prefix}${uuidv4().replace(/-/gi, "").toUpperCase().slice(0, 18)}`;
};

exports.getHasedPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

module.exports.generateOtp = ({ length = 6 } = {}) => {
  const allowsChars = "0123456789";
  let password = "";

  for (let index = 0; index < length; ++index) {
    const charIndex = _rand(0, allowsChars.length - 1);
    password += allowsChars[charIndex];
  }
  return password;
};

module.exports.secondsSinceEpoch = () => {
  return Math.round(Date.now() / 1000);
};


exports.generateToken = (user, q = {}) => {
  return new Promise((res, rej) => {
    jwt.sign(user, appConfig.JWT_SECRET, q, (err, token) => {
      if (err) {
        rej(true);
      } else {
        res(token);
      }
    });
  });
};

exports.verifyToken = (token) => {
  return new Promise((res, rej) => {
    const bearer = token.split(" ")[1];
    jwt.verify(bearer, appConfig.JWT_SECRET, async (err, authdata) => {
      if (err) {
        rej(err);
      } else {
        res(authdata);
      }
    });
  });
};

exports.decodedToken = (token) => {
  return jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
    if (err) {
      debug(err);
      return reject(err);
    }
    return decoded;
  });
};
