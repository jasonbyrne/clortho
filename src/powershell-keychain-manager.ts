import * as path from 'path';
import { jsStringEscape } from 'js-string-escape';
import { runPowershell } from './run-powershell';
import { iKeyChain, iCredentials } from '.';

const credManPath = path.resolve(__dirname, '../CredMan.ps1');
const runCredMan = (cmd, opts) =>
  runPowershell(
    Object.keys(opts).reduce(
      (cmd, k) => cmd + ` -${k} '${jsStringEscape(opts[k])}'`,
      `"${credManPath}" -${cmd}`
    ),
    true
  );
const passwordLineRE = /^[\s\t]*Password[\s\t]*:[\s\t]?'(.*)'/;
const createTargetName = (service, account) => `${service};user=${account}`;

export class PowershellKeychainManager implements iKeyChain {

    public get(service: string, account: string): Promise<iCredentials> {
        return runCredMan(
            'GetCred',
            {
                Target: createTargetName(service, account)
            }
        ).then(res => {
            if (res.match(/was not found\.$/)) {
                throw new Error(`Could not find ${service} password for ${account}`);
            }
            let pwl = res.split('\n').find(l => !!l.match(passwordLineRE));
            if (!pwl) {
                throw new Error(`Unknown error finding ${service} password for ${account}.`);
            }
            return { account: account, password: pwl.match(passwordLineRE)[1] };
        });
    }

    public set(service: string, account: string, password: string): Promise<iCredentials> {
        return runCredMan(
            'AddCred',
            {
                Target: createTargetName(service, account),
                User: account,
                Pass: password
            }
        ).then(res => {
            if (res.indexOf('Successfully') !== 0) {
                throw new Error('Unknown error saving to keychain');
            }
            return { account: account, password: password };
        })
    }

    public remove(service: string, account: string): Promise<any> {
        return runCredMan(
            'DelCred',
            {
                Target: createTargetName(service, account)
            }
        ).then(res => {
            if (res.indexOf('Successfully') !== 0) {
                throw new Error('Unknown error removing from keychain');
            }
        })
    }

}
