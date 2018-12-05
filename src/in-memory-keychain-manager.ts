import { iKeyChain, iCredentials } from './osx-keychain-manager';

let cache: any = {};

export class InMemoryKeychainManager implements iKeyChain {

    public get(service: string, username: string): Promise<iCredentials> {
        if (cache[service] && cache[service][username]) {
            return Promise.resolve({
                username,
                password: cache[service][username]
            });
        }
        return Promise.reject(new Error(`Could not find ${service} password for ${username}.`));
    }

    public set(service: string, username: string, password: string): Promise<iCredentials> {
        cache[service] = cache[service] || {};
        cache[service][username] = password;
        return Promise.resolve({ username, password });
    }

    public remove(service: string, username: string): Promise<any> {
        cache[service] = cache[service] || {};
        delete cache[service][username];
        return Promise.resolve();
    }

}
