'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const Promise = require('bluebird');

function getColumnValues(cells, col) {
    return cells.filter((cell) => {
        return cell.col === col;
    }).map((cell) => {
        return cell.value;
    });
}

function getObject(keys, values) {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.length > 0) {
            obj[key] = values[i];
        }
    }
    return obj;
}

const creds = require('./credentials.json');
const config = require('./config.json');

const doc = new GoogleSpreadsheet(config.google_spreadsheet_id);
Promise.promisifyAll(doc);

doc.useServiceAccountAuthAsync(creds).then(() => {
    return doc.getInfoAsync();
})
.then((info) => {
    const sheet = info.worksheets[config.sheet_number];
    Promise.promisifyAll(sheet);
    return sheet.getCellsAsync({
        'min-col': 1,
        'max-col': 2,
        'return-empty': true
    })
})
.then((cells) => {
    const keys = getColumnValues(cells, 1);
    const values = getColumnValues(cells, 2);
    const pairs = getObject(keys, values);
    console.log(JSON.stringify(pairs, null, 4));
})
.catch((err) => {
    console.log(err);
});


