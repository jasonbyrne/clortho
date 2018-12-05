import { iKeyChain, iCredentials } from '.';

const keychain = require('keychain');

export class OSX_Keychain implements iKeyChain {

    public get(service, account): Promise<iCredentials> {
        return new Promise((resolve, reject) => {
            keychain.getPassword({ service, account }, (err, password) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve({ account: account, password: password });
            });
        });
    }

    public set(service, account, password): Promise<iCredentials> {
        return new Promise((resolve, reject) => {
            keychain.setPassword({ service, account, password }, err => {
                if (err) {
                    return reject(err.message);
                }
                return resolve({ account: account, password: password });
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
