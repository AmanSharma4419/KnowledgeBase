const urlShortner = require('../models/shortUrl.model');
const url = require("url");
const { APP_URL, APP_URL_FRONT} = require('./../appConfig');

function urlToken() {
    let length = 7;
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function generateShortUrLToken(longUrl) {
    return new Promise((resolve, reject) => {
        console.log("Long Url ", longUrl);
        let token = urlToken();
        let shortUrl = APP_URL + "/api/v1/verf/" + token;
        let createData ={
            token: token,
            shortUrl: shortUrl,
            longUrl: longUrl
        }

        urlShortner.create(createData)
            .then(createSuccess => {
                console.log("Create success", createSuccess);
                return resolve(createSuccess.shortUrl);
            })
            .catch(err => {
                console.log("Error : ", err);
                return resolve("error");
            })
    })
}

function redirectToUrl(req, res){
    console.log("Function call: ", req.url);
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var arr = url_parts.path.split("/");
		var len = arr.length;
		let errTokenUrl = ""
		try {
			urlShortner.findOne({
				token: arr[len - 1]
			},
				{
					_id: 0, __v: 0
				})
				.then(async findSuccess => {
					if (findSuccess) {
						let redirectLink = findSuccess.longUrl
							return res.redirect(redirectLink);
					} else {
						console.log(conMes.validateTokenError + 'Link expired/broken.');
						return res.redirect(errTokenUrl);
					}
				});
		} catch (e) {
			console.log(conMes.validateTokenError + 'Link expired/broken.', e);
			return res.redirect(errTokenUrl); // Define error url if needed.
		}
}

module.exports = {
	generateShortUrLToken,
	redirectToUrl
}