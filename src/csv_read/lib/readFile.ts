import { readFile as fsReadFile } from 'fs';
export function readFile(path: string){
    return new Promise<string>((resolve, reject) => {
        fsReadFile(path, 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
} 