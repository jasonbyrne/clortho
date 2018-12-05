import { keychain } from './keychain-access';
import { iCredentials } from './osx-keychain-manager';

export class ClorthoService {

    protected serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    public getFromKeychain (username: string): Promise<iCredentials> {
        return keychain.get(this.serviceName, username);
    }

    public saveToKeychain (username: string, password: string): Promise<iCredentials> {
        return keychain.set(this.serviceName, username, password);
    }

    public removeFromKeychain (username: string): Promise<any> {
        return keychain.remove(this.serviceName, username);
    }

}

export const clortho = function (serviceName: string): ClorthoService {
    return new ClorthoService(serviceName);
}
