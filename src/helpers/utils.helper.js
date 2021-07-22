const debug = require("debug")("app:utilsHelper");
const { v4: uuidv4 } = require("uuid");
const randomString = require("random-base64-string");
const mkdirp = require("mkdirp");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const XLSX = require('xlsx');
const parse = require("csv-parse");
const appConfig = require("./../appConfig");
const request = require('request');

function _rand(min, max) {
  const random = Math.random();
  return Math.floor(random * (max - min) + min);
}

module.exports.checkFileExt = (file) => {
  try {
    if (file || Object.keys(file).length === 9) {
      for (let i = 0; i < Object.keys(file).length; i++) {
        let extention = path
          .extname(file[Object.keys(file)[i]].name)
          .toLowerCase();
        if (
          extention == ".pdf" ||
          extention == ".png" ||
          extention == ".jpeg" ||
          extention == ".jpg"
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  } catch (e) {
    throw e;
  }
}

module.exports.createDirectory = (directoryPath) => {
  const directory = path.normalize(directoryPath)
  return new Promise((resolve, reject) => {
    fs.stat(directory, error => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.mkdir(directory, { recursive: true }, error => {
            if (error) {
              reject(error)
            } else {
              resolve(directory)
            }
          })
        } else {
          reject(error)
        }
      } else {
        resolve(directory)
      }
    })
  })
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

module.exports.readExcel = async (path) => {
  return new Promise((res, rej) => {
    try {
      const workbook = XLSX.readFile(path);

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet, { header: 'A' });
      let result = []
      data.forEach(element => {
        result.push(element.A)
      });
      res(result)
    } catch (e) {
      console.log(e)
      rej("")
    }
  })

}

module.exports.readCSV = async (path) => {
  return new Promise((res, rej) => {
    const data = [];
    try {
      fs.createReadStream(path)
        .pipe(parse())
        .on("data", (r) => {
          data.push(r[0]);
        })
        .on("end", () => {
          res(data);
        });
    } catch (e) {
      console.log(e)
      rej("err");
    }
  });
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

module.exports.alphanumeric_unique = () => {
  return Math.random()
    .toString(36)
    .split("")
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
    .join("")
    .substr(2, 12);
};

module.exports.generateRandomString = ({ length = 12 } = {}) => {
  return randomString(length);
};

module.exports.generateReferralEight = ({ length } = {}) => {
  return randomString(length);
};

module.exports.sleep = ({ milliseconds = 1000 } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, milliseconds);
  });
};

module.exports.secondsSinceEpoch = () => {
  return Math.round(Date.now() / 1000);
};

module.exports.writeFile = async (folder, fileName, buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      await mkdirp(folder, { recursive: true });

      fs.writeFile(path.join(folder, fileName), buffer, async () => {
        return resolve();
      });
    } catch (e) {
      return reject(e);
    }
  });
};

exports.readHTMLFile = async (path, callback) => {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
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
