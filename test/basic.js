const clortho = require('../dist/index.js').clortho;

let service = clortho('Clortho');

service.set('jason', 'password')
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log(err);
    });

service.get('jason')
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log(err);
    });

