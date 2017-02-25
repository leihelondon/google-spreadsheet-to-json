'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const Promise = require('bluebird');
const creds = require('./credentials.json');
const config = require('./config.json');
const doc = new GoogleSpreadsheet(config.google_spreadsheet_id);

Promise.promisifyAll(doc);

doc.useServiceAccountAuthAsync(creds).then(() => {
	return doc.getInfoAsync();
}).then((info) => {
	console.log(info);
}).catch((err) => {
	console.log(err);
});