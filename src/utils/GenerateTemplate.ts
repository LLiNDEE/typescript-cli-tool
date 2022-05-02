import fs from 'fs-extra';
import path from 'path'
import { project } from "../types/types.js";
import { templates, template } from '../types/types.js';


export async function GenerateTemplate(project: project): Promise<boolean>
{   

   try{



        // fs.copySync(path.resolve(path.dirname(''),`./templates/${project.type}`), project.path!)
        findFiles(project.type!)
   }catch(error){
       return false;
   }

    return true;
}

function readFile(filepath: string): string
{

    

    return ""

}

async function findFiles(templateName: template | string): Promise<boolean>
{   
    const files = templates.templateName.files
    const folders = templates.templateName.folders
    console.log("files", files)
    try{

        

    }catch(error){
        console.log(error)
        return false;
    }

    return true
}