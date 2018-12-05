declare class ClorthoService {
    protected serviceName: string;
    constructor(serviceName: string);
    getFromKeychain(username: string): Promise<import("../../../../../Users/jasonbyrne/repos/clortho-lite/src/osx-keychain-manager").iCredentials>;
    saveToKeychain(username: string, password: string): Promise<import("../../../../../Users/jasonbyrne/repos/clortho-lite/src/osx-keychain-manager").iCredentials>;
    trySaveToKeychain(credential: any): Promise<any>;
    removeFromKeychain(username: string): Promise<any>;
}
export declare const clortho: (serviceName: string) => ClorthoService;
export {};
