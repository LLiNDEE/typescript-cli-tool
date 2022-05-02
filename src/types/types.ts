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

export const templateNames = {
    typescript: 'typescript',
    ['html-css-js']: 'html-css-js',
}

export const templates = {
    [templateNames.typescript]: {
        files: ['index.ts', 'tsconfig.json', 'package.json'],
        folders: ['src', 'lib']
    }
} as const

export type t = typeof templateNames;
export type template = keyof t