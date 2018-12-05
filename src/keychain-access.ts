import { isOSX, isWindows, hasPowershell } from './os-features';
import { OSX_Keychain } from './osx-keychain-manager';
import { PowershellKeychainManager } from './powershell-keychain-manager';
import { InMemoryKeychainManager } from './in-memory-keychain-manager';
import { iKeyChain } from '.';

export const keychain: iKeyChain = (function () {
    if (isOSX) {
        return new OSX_Keychain();
    }
    if (isWindows && hasPowershell) {
        return new PowershellKeychainManager();
    }
    return new InMemoryKeychainManager();
})();