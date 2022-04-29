import fs from 'fs';
import process from 'process'

export async function validateFolder(path: string): Promise<string>
{   

    const folder: Promise<boolean> = new Promise((resolve, reject) => {

        if(path.includes("/") || path.includes("\\")){
            console.log("inside if")
            fs.lstat(path, (err, stats) => {
                if(err) resolve(false);

                if(!stats){
                    resolve(false);
                    return;
                }
    
                if(stats.isDirectory()){
                    resolve(true);
                }
    
                resolve(false);
            })
            return;
        }

        fs.lstat(`${process.cwd()}/${path}`, (err, stats) => {
            if(err) resolve(false);

            if(!stats){
                resolve(false);
                return;
            }

            if(stats.isDirectory()){
                resolve(true);
            }

            resolve(false);
        })
    });

    return await folder ? `A directory called ${path} already exists` : "Creating directory...";
}