'use strict';

var keychain = require('./keychain-access');

var clortho = function clortho(opts) {
  if (!opts) {
    throw new Error('No configuration object supplied.');
  }
  var service = opts.service,
      username = opts.username;

  var vinz = clortho.forService(service);
  return vinz.getFromKeychain(username);
};

clortho.forService = function (service) {
  if (!service) {
    throw new Error('No service name supplied. Please supply a service name for this credential. It can be arbitrary.');
  }
  if (typeof service !== 'string') {
    throw new Error('Service name must be a string.');
  }
  return {
    getFromKeychain: function getFromKeychain(username) {
      return keychain.get(service, username);
    },
    saveToKeychain: function saveToKeychain(username, password) {
      return keychain.set(service, username, password);
    },
    trySaveToKeychain: function trySaveToKeychain(credential) {
      return keychain.set(service, credential.username, credential.password).then(function () {
        return credential;
      }, function () {
        return credential;
      });
    },
    removeFromKeychain: function removeFromKeychain(username) {
      return keychain.remove(service, username);
    }
  };
};

module.exports = clortho;