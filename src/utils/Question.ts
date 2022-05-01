import inquirer from "inquirer";
import { validateFolder, validateProjectName } from './Validations.js'
import process from 'process'

type Output = {
    answer: string | undefined
}

type QuestionInput = {
    question: string,
    defaultValue?: string,
    choices?: Array<string>
    type?: string,
    validation?: string,
    question_type?: string,
}


export async function createQuestion(args: QuestionInput): Promise<Output>
{   
    let response: string | undefined = undefined;

    await inquirer.prompt({
        type: args?.type ? args.type : "input",
        name: 'questionAnswer',
        message: args.question,
        prefix: '$',
        ...args.choices ? {choices: args.choices}: null,
        ...args.defaultValue ? {default: args.defaultValue}: null,
        ...{validate: args?.validation ? (args.validation === 'folder' ? validateFolder : (args.validation === 'projectName' ? validateProjectName : "")) : null}
    }).then(data => {
        response = data.questionAnswer
        if(args?.question_type === 'project_path'){
            if(!response?.includes('/') || !response?.includes('\\')) response = `${process.cwd()}/${data.questionAnswer}`
        }
    })

    return {answer: response}
}