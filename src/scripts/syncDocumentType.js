const debug = require('debug')('app:syncSubscriptionPlanScript');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');

const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');
const appRoot = require('app-root-path');
const DocumentType = mongoose.model(models.DOCUMENTTYPE);


module.exports.init = async () => {
    try {
        let schemaHeader =[`docTypeId`,`docName`,`id`,`address`,`income`,`age`,`education`,`others`,`isDigital`,`isFront`,`isBack`,`isUpload`,`isScanQR`,`isIPV`,`countryCode`,`isOrg`,`isMe`]
        fs.readFile(appRoot+'/resources/documentType.csv', 'utf8', async function(err, data) {
            if (err) throw err;
            let rows = data.trim().split(/\r?\n/)
            let allDocuments =[]
            rows.forEach((v, k)=>{
                if(k!=0){
                    let docDetails = v.split(',')
                    let docJson = {}
                    docDetails.forEach((value, key)=>{
                        docJson[schemaHeader[key]]=value
                    })
                    allDocuments.push(docJson)
                }
            })
            for(let i=0; i<allDocuments.length;i++){
                await DocumentType.findOneAndUpdate(
                    { docTypeId: allDocuments[i]['docTypeId'] },
                     { $set: { docTypeId:allDocuments[i]['docTypeId'], docName:allDocuments[i]['docName'], id:allDocuments[i]['id'], address:allDocuments[i]['address'],income:allDocuments[i]['income'], age:allDocuments[i]['age'], education:allDocuments[i]['education'], others:allDocuments[i]['others'], isDigital:allDocuments[i]['isDigital'],isFront:allDocuments[i]['isFront'],isBack:allDocuments[i]['isBack'], isUpload:allDocuments[i]['isUpload'],isScanQR:allDocuments[i]['isScanQR'],isIPV:allDocuments[i]['isIPV'],countryCode:allDocuments[i]['countryCode'],isOrg:allDocuments[i]['isOrg'],isMe:allDocuments[i]['isMe'] } },
                  { upsert: true },
                );
            }
            // let x = await DocumentType.count({})
            // console.log(x)
            console.log('TASK DONE SYNC DOCUMENT-TYPE')
        });

    } catch (e) {
        console.log(e)
    }
};
