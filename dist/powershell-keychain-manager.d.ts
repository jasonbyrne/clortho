import { iKeyChain, iCredentials } from './osx-keychain-manager';
export declare class PowershellKeychainManager implements iKeyChain {
    get(service: string, account: string): Promise<iCredentials>;
    set(service: string, account: string, password: string): Promise<iCredentials>;
    remove(service: string, account: string): Promise<any>;
}
