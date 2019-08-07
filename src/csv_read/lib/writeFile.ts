import { writeFile as fsWriteFile } from 'fs';
export function writeFile(path: string, data: string){
    return new Promise<void>((resolve, reject) => {
        fsWriteFile(path, data, (err) => {
            if(err) reject(err);
            resolve();
        })
    })
} 