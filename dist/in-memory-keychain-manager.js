"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let cache = {};
class InMemoryKeychainManager {
    get(service, username) {
        if (cache[service] && cache[service][username]) {
            return Promise.resolve({
                username,
                password: cache[service][username]
            });
        }
        return Promise.reject(new Error(`Could not find ${service} password for ${username}.`));
    }
    set(service, username, password) {
        cache[service] = cache[service] || {};
        cache[service][username] = password;
        return Promise.resolve({ username, password });
    }
    remove(service, username) {
        cache[service] = cache[service] || {};
        delete cache[service][username];
        return Promise.resolve();
    }
}
exports.InMemoryKeychainManager = InMemoryKeychainManager;
