export interface iKeyChain {
    get(service: string, account: string): Promise<iCredentials>;
    set(service: string, account: string, password: string): Promise<iCredentials>;
    remove(service: string, account: string): Promise<any>;
}
export interface iCredentials {
    username: string;
    password: string;
}
export declare class OSX_Keychain implements iKeyChain {
    get(service: any, account: any): Promise<iCredentials>;
    set(service: any, account: any, password: any): Promise<iCredentials>;
    remove(service: any, account: any): Promise<any>;
}
