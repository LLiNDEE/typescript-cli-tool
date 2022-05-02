import fs from 'fs-extra';
import path from 'path'
import { project } from "../types/types.js";


export async function GenerateTemplate(project: project): Promise<boolean>
{   

   try{



        fs.copySync(path.resolve(path.dirname(''),`./templates/${project.type}`), project.path!)
   }catch(error){
       return false;
   }

    return true;
}

function readFile(filepath: string): string
{

    

    return ""

}

async function findFiles(templateName: string): Promise<boolean>
{
    return true
}