"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keychain_access_1 = require("./keychain-access");
class ClorthoService {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }
    getFromKeychain(username) {
        return keychain_access_1.keychain.get(this.serviceName, username);
    }
    saveToKeychain(username, password) {
        return keychain_access_1.keychain.set(this.serviceName, username, password);
    }
    trySaveToKeychain(credential) {
        return keychain_access_1.keychain.set(this.serviceName, credential.username, credential.password)
            .then(() => credential, () => credential);
    }
    removeFromKeychain(username) {
        return keychain_access_1.keychain.remove(this.serviceName, username);
    }
}
exports.clortho = function (serviceName) {
    return new ClorthoService(serviceName);
};
