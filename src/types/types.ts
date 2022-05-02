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
    choices?: Array<string>
    type?: string,
    validation?: string,
    question_type?: string,
}