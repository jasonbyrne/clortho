import * as childProcess from 'child_process';

export function runPowershell(s, isFile): Promise<any> {
    return new Promise((resolve, reject) => {
        let child = childProcess.exec(
            'powershell -' + (isFile ? 'File' : 'Command') + ' ' + s, 
            {  },
            (e, stdout, stderr) => {
                if (e) return reject(e);
                if (stderr) return reject(stderr);
                resolve(stdout.trim());
            }
        );
        child.stdin.end();
    });
};