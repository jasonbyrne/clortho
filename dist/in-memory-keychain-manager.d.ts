import { iKeyChain, iCredentials } from './osx-keychain-manager';
export declare class InMemoryKeychainManager implements iKeyChain {
    get(service: string, username: string): Promise<iCredentials>;
    set(service: string, username: string, password: string): Promise<iCredentials>;
    remove(service: string, username: string): Promise<any>;
}
