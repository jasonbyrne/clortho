import { keychain } from './keychain-access';

export interface iKeyChain {
    get(service: string, account: string): Promise<iCredentials>
    set(service: string, account: string, password: string): Promise<iCredentials>
    remove(service: string, account: string): Promise<any>
}

export interface iCredentials {
    account: string
    password: string
}

export class ClorthoService implements iKeyChain {

    protected serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    public get(account: string): Promise<iCredentials> {
        return keychain.get(this.serviceName, account);
    }

    public set(account: string, password: string): Promise<iCredentials> {
        return keychain.set(this.serviceName, account, password);
    }

    public remove(account: string): Promise<any> {
        return keychain.remove(this.serviceName, account);
    }

}

export const clortho = function (serviceName: string): ClorthoService {
    return new ClorthoService(serviceName);
}
