const debug = require('debug')('app:syncStatesScript');
const mongoose = require('mongoose');
const fs = require('fs');
const appRoot = require('app-root-path');

const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');

const StateModel = mongoose.model(models.STATEDETAILS);

module.exports.init = async () => {
    try {  
        let schemaHeader =[`stateId`, `stateName` , `countryId`,`countryName`]
        fs.readFile(appRoot+'/resources/states.csv', 'utf8', async function(err, data) {
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
              await StateModel.findOneAndUpdate(
                    { stateId: allCountry[i]['stateId'] },
                    { $set: { stateId:allCountry[i]['stateId'], stateName:allCountry[i]['stateName'], countryId:allCountry[i]['countryId'], countryName:allCountry[i]['countryName']} },
                    { upsert: true },
                );
            }

          console.log('TASK DONE SYNC STATE')
        });
    } catch (e) {
            console.log(e)
    }
};