'use strict';

var keychain = require('keychain');

module.exports = {
  get: function get(service, account) {
    return new Promise(function (resolve, reject) {
      keychain.getPassword({ service: service, account: account }, function (err, password) {
        if (err) {
          return reject(err.message);
        }
        return resolve({ username: account, password: password });
      });
    });
  },
  set: function set(service, account, password) {
    return new Promise(function (resolve, reject) {
      keychain.setPassword({ service: service, account: account, password: password }, function (err) {
        if (err) {
          return reject(err.message);
        }
        return resolve({ username: account, password: password });
      });
    });
  },
  remove: function remove(service, account) {
    return new Promise(function (resolve, reject) {
      keychain.deletePassword({ service: service, account: account }, function (err) {
        if (err) {
          return reject(err.message);
        }
        return resolve();
      });
    });
  }
};