import fs from 'fs';
import process from 'process'

export async function validateFolder(path: string): Promise<string | boolean>
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
    if(path === '.') return true
    return await folder ? `A directory called ${path} already exists` : true;
}

export function validateProjectName(name: string): string | boolean
{   

   if(name.length  === 0) return "Project name can NOT be empty!"
   if(name.length > 214) return "Project name length CANNOT exceed 214 characters"
   if(name.toLowerCase() !== name) return "Project name MUST be in lowercase!"
   if(!name.match(/^[a-z\-0-9]+$/gm)) return "Project name may ONLY contain alphanumeric characters and -"
   if(name.startsWith("." || name.startsWith("-"))) return "Project name cannot start with . or -"
   if(name.includes('http') || name.includes('stream') || name.includes('node_modules') || name.includes('favicon.ico')) return "Project name conatins invalid substring"

    return true
}