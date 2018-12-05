'use strict';
const keychain = require('./keychain-access');


let clortho = function (service) {
  if (!service) {
    throw new Error('No service name supplied. Please supply a service name for this credential. It can be arbitrary.');
  }
  else if (typeof service !== 'string') {
    throw new Error('Service name must be a string.');
  }
  return clortho.forService(service);
};

clortho.forService = function (service) {
  return {
    getFromKeychain: function (username) {
      return keychain.get(service, username);
    },
    saveToKeychain: function  (username, password) {
      return keychain.set(service, username, password);
    },
    trySaveToKeychain: function (credential) {
      return keychain.set(service, credential.username, credential.password)
      .then(
        () => credential,
        () => credential
      );
    },
    removeFromKeychain: function (username) {
      return keychain.remove(service, username);
    }
  };
};

module.exports = clortho;
