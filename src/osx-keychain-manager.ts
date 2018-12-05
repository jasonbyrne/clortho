const keychain = require('keychain');

export interface iKeyChain {
    get(service: string, account: string): Promise<iCredentials>
    set(service: string, account: string, password: string): Promise<iCredentials>
    remove(service: string, account: string): Promise<any>
}

export interface iCredentials {
    username: string
    password: string
}

export class OSX_Keychain implements iKeyChain {

    public get(service, account): Promise<iCredentials> {
        return new Promise((resolve, reject) => {
            keychain.getPassword({ service, account }, (err, password) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve({ username: account, password });
            });
        });
    }

    public set(service, account, password): Promise<iCredentials> {
        return new Promise((resolve, reject) => {
            keychain.setPassword({ service, account, password }, err => {
                if (err) {
                    return reject(err.message);
                }
                return resolve({ username: account, password });
            });
        });
    }

    public remove(service, account): Promise<any> {
        return new Promise((resolve, reject) => {
            keychain.deletePassword({ service, account }, err => {
                if (err) {
                    return reject(err.message);
                }
                return resolve();
            });
        });   
    } 

}
