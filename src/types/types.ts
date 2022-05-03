export type project = {
    type: string | undefined,
    path: string | undefined,
    name: string | undefined,
}

export type Output = {
    answer: string | undefined
}

export type QuestionInput = {
    question: string,
    defaultValue?: string,
    choices?: Array<string> | boolean
    type?: string,
    validation?: string,
    question_type?: string,
}

export type filesInTemplate = {
    folders: Array<string> | undefined,
    files: Array<string> | undefined,
}

export type duplicateData = {
    exist: boolean,
    name: string | undefined,
    type: string | undefined,
}