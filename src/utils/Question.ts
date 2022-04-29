import inquirer from "inquirer";
import { validateFolder } from './Validations.js'

type Output = {
    answer: string | undefined
}

type QuestionInput = {
    question: string,
    defaultValue?: string,
    choices?: Array<string>
    type?: string,
    validation?: string
}


export async function createQuestion(args: QuestionInput): Promise<Output>
{   
    let response: string | undefined = undefined;

    await inquirer.prompt({
        type: args?.type ? args.type : "input",
        name: 'questionAnswer',
        message: args.question,
        ...args.choices ? {choices: args.choices}: null,
        ...args.defaultValue ? {default: args.defaultValue}: null,
        ...args.validation ? {validate: args.validation === 'folder' ? validateFolder : null}:null
    }).then(data => {
        response = data.questionAnswer
    })

    return {answer: response}
}


async function getValidation(type: string)
{   
    console.log("validationtype", type)
    if(type === 'folder') validateFolder

}
