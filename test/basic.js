const clortho = require('../src/index');

let service = clortho('Clortho');

service.saveToKeychain('jason', 'password')
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log(err);
    });

service.getFromKeychain('jason')
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log(err);
    });

