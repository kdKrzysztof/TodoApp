export interface addTodo {
    Title: string;
    Desc: string;
    expiresIn: Date | undefined;
}

export interface todoListData {
    userId: number;
    title: string;
    desc: string | null;
    createdAt: Date | null;
    expiresIn: Date | null;
}
