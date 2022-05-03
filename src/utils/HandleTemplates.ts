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

        const folderExist = checkIfFolderExist(project.path)

        if(!folderExist){
            fs.mkdirSync(project.path);
        }

        fs.copySync(path.resolve(path.dirname(''),`./templates/${project.type}`), project.path!)
        
        if(templateFilesAndFolders.files?.includes('package.json')){
            fs.readFile(`${project.path}/package.json`, 'utf8', function (err,data) {
                if (err) {
                  return false;
                }
                const result = data.replace("project_name", `${project.name}`);
              
                fs.writeFile(`${project.path}/package.json`, result, 'utf8', function (err) {
                   if (err) return false;
                });
              });
        }
        
        return true;

   }catch(error){
       console.log(error);
       return false;
   }

    return true;
}

function checkIfFolderExist(folderpath: string): boolean
{
    try{

        const folderExist = fs.existsSync(`${folderpath}`)

        return folderExist
    }catch(error){
        return false
    }
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
            folders: [],
            files: [],
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
                const exist = fs.existsSync(`${path}${f}`)
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

                const exist = fs.existsSync(`${path}${f}`)
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
