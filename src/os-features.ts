import * as os from 'os';
import { which } from 'which';

export const hasPowershell: boolean = (function () {
  try {
    return which.sync('powershell');
  } catch (e) {
    return false;
  }
}());

export const platform = process.env.TEST_PLAT || os.platform();
export const isWindows: boolean = (platform.indexOf('win') === 0);
export const isOSX: boolean = (platform.indexOf('darwin') === 0);
