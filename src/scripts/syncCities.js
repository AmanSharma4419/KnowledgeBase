const debug = require('debug')('app:syncStatesScript');
const mongoose = require('mongoose');
const fs = require('fs');
const appRoot = require('app-root-path');

const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');

const CityModel = mongoose.model(models.CITYDETAILS);

module.exports.init = async () => {
    try {
        let schemaHeader =[`cityId`, `cityName`, `stateId`,`stateName`]
        fs.readFile(appRoot+'/resources/cities.csv', 'utf8', async function(err, data) {
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
              await CityModel.findOneAndUpdate(
                    { cityId: allCountry[i]['cityId'] },
                    { $set: { cityId:allCountry[i]['cityId'], cityName:allCountry[i]['cityName'],  stateId:allCountry[i]['stateId'],stateName:allCountry[i]['stateName']} },
                    { upsert: true },
                );
            }

          console.log('TASK DONE SYNC CITY')
        });
    } catch (e) {
            console.log(e)
    }
};
