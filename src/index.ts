import inquirer from "inquirer";
import { createQuestion } from './utils/Question.js';
import { project } from "./types/types.js";
import { GenerateTemplate } from "./utils/GenerateTemplate.js";

const templates = ["Typescript", "NodeJS", "HTML/CSS/JS"];

async function index(): Promise<void>
{

    const project: project = {
        type: undefined,
        path: undefined,
        name: undefined,
    }

    const typeOfProject = await createQuestion({question: "What type of project do you want to create?", type: "list", choices: templates});
    project.type = typeOfProject.answer

    console.log(typeOfProject.answer);  

    const projectName = await createQuestion({question: "Enter the name of the project", validation: 'projectName'})
    project.name = projectName.answer

    const projectpath = await createQuestion({question: "Enter folder name or path", validation: "folder", defaultValue: "Current path", question_type: "project_path"})
    project.path = projectpath.answer
    // console.log("Type: ", typeOfProject)

    const response = await GenerateTemplate(project);
    
    if(!response) return console.log("Could not generate template! :(")

    console.log(project)

}

index();