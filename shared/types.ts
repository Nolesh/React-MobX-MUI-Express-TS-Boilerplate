
export type TItemData = { title: string, desc: string };

export type TResponse = {
    content: TItemData[]
}

export interface IError {
    status: number,
    message: string
}
