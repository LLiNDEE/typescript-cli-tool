import inquirer from "inquirer";
import { createQuestion } from './utils/Question.js';

const templates = ["Typescript", "NodeJS", "HTML/CSS/JS"];

type project = {
    type: string | undefined,
    path: string | undefined,
    name: string | undefined,
}

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
    console.log(project)

}

index();