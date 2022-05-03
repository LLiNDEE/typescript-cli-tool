import fs from 'fs-extra';
import path from 'path'
import { project, filesInTemplate, duplicateData } from "../types/types.js";

export async function GenerateTemplate(project: project): Promise<boolean | duplicateData>
{   
   try{

        const templateFilesAndFolders: filesInTemplate | boolean = await getFilesInTemplate(project.type);
        if(typeof templateFilesAndFolders === "boolean") return false
        if(typeof project.path === 'undefined') return false

        const duplicatesExist = await checkIfFilesExist(templateFilesAndFolders, project.path);
        if(!duplicatesExist || duplicatesExist.exist) return duplicatesExist

        // fs.copySync(path.resolve(path.dirname(''),`./templates/${project.type}`), project.path!)
        // findFiles(project.type!)



   }catch(error){
       return false;
   }

    return true;
}

function readFile(filepath: string): string
{

    

    return ""

}

export async function getTemplateNames(): Promise<string[] | boolean> 
{
    try{

        let templates: string[] = []
        
        fs.readdirSync((path.dirname(''),`./templates`)).forEach(file =>{
            templates.push(file.charAt(0).toUpperCase() + file.slice(1))
        })
        
        return templates
    }catch(error){
        return false;
    }
}

async function getFilesInTemplate(templateName: string | undefined): Promise<filesInTemplate | boolean>
{
    try{
        const filesInTemplate: filesInTemplate = {
            folders: undefined,
            files: undefined,
        }
    
        fs.readdirSync((path.dirname(''),`./templates/${templateName}`), {withFileTypes: true}).forEach(item =>{
            if(item.isDirectory()){
                filesInTemplate.folders?.push(item.name);
            }else{
                filesInTemplate.files?.push(item.name);
            }
        })
    
        return filesInTemplate
    }catch(error){
        return false
    }
}

async function checkIfFilesExist(templateFiles: filesInTemplate, path: string)
{
    try{
        const duplicateData: duplicateData= {
            exist: false,
            name: undefined,
            type: undefined,
        }

        const folders = templateFiles.folders;
        const files = templateFiles.files;

        if(folders !== undefined){
            folders.forEach(f => {
                if(duplicateData.exist) return;
                const exist = fs.existsSync(`${path}/${f}`)
                if(exist){
                    duplicateData.exist = true
                    duplicateData.name = f,
                    duplicateData.type = "folder"
                    return;
                }
            })
        }

        if(files !== undefined && !duplicateData.exist){
            files.forEach(f => {
                if(duplicateData.exist) return;

                const exist = fs.existsSync(`${path}/${f}`)
                if(exist){
                    duplicateData.exist = true
                    duplicateData.name = f
                    duplicateData.type = "file"
                }
            })
        }

        return duplicateData;

    }catch(error){
        return false;
    }
}
