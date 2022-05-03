import clc from 'cli-color';
import { createQuestion } from './utils/Question.js';
import { project } from "./types/types.js";
import { GenerateTemplate, getTemplateNames } from "./utils/HandleTemplates.js";



async function index(): Promise<void>
{   

    const templates = await getTemplateNames();

    const project: project = {
        type: undefined,
        path: undefined,
        name: undefined,
    }

    if(!templates) return console.log(clc.red.bold("ERROR:"), clc.redBright("Failed to load templates!\r\n"));

    const typeOfProject = await createQuestion({question: "What type of project do you want to create?", type: "list", choices: templates});
    project.type = typeOfProject.answer

    console.log(typeOfProject.answer);  

    const projectName = await createQuestion({question: "Enter the name of the project", validation: 'projectName'})
    project.name = projectName.answer

    const projectpath = await createQuestion({question: "Enter folder name or path", validation: "folder", defaultValue: "Current path", question_type: "project_path"})
    project.path = projectpath.answer

    const response = await GenerateTemplate(project);
    
    if(typeof response !== 'boolean' && response.exist){
        return console.log(clc.yellow.bold("WARNING:"), clc.yellowBright(`A ${response.type} named ${response.name} already exist in ${project.path}`));
    }

    if(typeof response === 'boolean' && !response){
        return console.log(clc.red.bold("ERROR:"), clc.redBright("Could not generate template! :("))
    }

    if(typeof response === 'boolean' && response) return console.log(clc.green.bold("SUCCESS:"), clc.greenBright(`A ${project.type} template was generated in ${project.path}! :)`));
    
}

index();