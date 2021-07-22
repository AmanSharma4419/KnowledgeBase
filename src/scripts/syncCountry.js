const debug = require('debug')('app:syncStatesScript');
const mongoose = require('mongoose');
const fs = require('fs');
const appRoot = require('app-root-path');

const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');

const CountryModel = mongoose.model(models.COUNTRYDETAILS);

module.exports.init = async () => {
    try {  
        let schemaHeader =[`countryId`, `countryCode`,`__v`, `countryName`, `isBGVerification`,`isIPVerification`, `mobileCode`,`mobileLength`, `niceName`, `currencyCode`, `currencyName`]
        fs.readFile(appRoot+'/resources/countryDetails.csv', 'utf8', async function(err, data) {
          if (err) throw err;
          let rows = data.trim().split(/\r?\n/)
          let allCountry =[]
          rows.forEach((v, k)=> {
           if(k!=0) {
              let countryDetails = v.split(',')
              let countryJson = {}
              countryDetails.forEach((value, key) => {
                  countryJson[schemaHeader[key]] = value.trim()
              })
              allCountry.push(countryJson)
           }
          })
            for(let i=0; i<allCountry.length;i++){
              await CountryModel.findOneAndUpdate(
                    { countryId: allCountry[i]['countryId'] },
                    { $set: { countryId:allCountry[i]['countryId'], countryCode:allCountry[i]['countryCode'], __v:allCountry[i]['__v'], countryName:allCountry[i]['countryName'], isBGVerification:allCountry[i]['isBGVerification'],isIPVerification:allCountry[i]['isIPVerification'], mobileCode:allCountry[i]['mobileCode'],mobileLength:allCountry[i]['mobileLength'], niceName:allCountry[i]['niceName'], currencyCode:allCountry[i]['currencyCode'], currencyName:allCountry[i]['currencyName'] } },
                    { upsert: true },
                );
            }

          console.log('TASK DONE SYNC COUNTRY')
        });
    } catch (e) {
            console.log(e)
    }
};