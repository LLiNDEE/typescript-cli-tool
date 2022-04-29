import inquirer from "inquirer";
import { createQuestion } from './utils/Question.js';

const templates = ["Typescript", "NodeJS", "HTML/CSS/JS"];

async function index(): Promise<void>
{
    const projectpath = await createQuestion({question: "What is the project path?", validation: "folder", defaultValue: "Denna mapp"});
    console.log(projectpath.answer);

    const typeOfProject = await createQuestion({
        question: "What type of project do you want to create?",
        type: "list",
        choices: templates,
    })

    console.log("Type: ", typeOfProject)

}

index();