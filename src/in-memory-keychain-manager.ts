import { iKeyChain, iCredentials } from '.';

let cache: any = {};

export class InMemoryKeychainManager implements iKeyChain {

    public get(service: string, account: string): Promise<iCredentials> {
        if (cache[service] && cache[service][account]) {
            return Promise.resolve({
                account: account,
                password: cache[service][account]
            });
        }
        return Promise.reject(new Error(`Could not find ${service} password for ${account}.`));
    }

    public set(service: string, account: string, password: string): Promise<iCredentials> {
        cache[service] = cache[service] || {};
        cache[service][account] = password;
        return Promise.resolve({ account: account, password: password });
    }

    public remove(service: string, account: string): Promise<any> {
        cache[service] = cache[service] || {};
        delete cache[service][account];
        return Promise.resolve();
    }

}
