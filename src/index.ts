import { keychain } from './keychain-access';

class ClorthoService {

    protected serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    public getFromKeychain (username: string) {
        return keychain.get(this.serviceName, username);
    }

    public saveToKeychain (username: string, password: string) {
        return keychain.set(this.serviceName, username, password);
    }

    public trySaveToKeychain (credential) {
        return keychain.set(this.serviceName, credential.username, credential.password)
        .then(
            () => credential,
            () => credential
        );
    }

    public removeFromKeychain (username: string) {
        return keychain.remove(this.serviceName, username);
    }

}

export const clortho = function (serviceName: string) {
    return new ClorthoService(serviceName);
}
