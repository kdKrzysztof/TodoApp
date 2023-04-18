export interface AddTodo {
    Title: string;
    Desc: string;
    expiresIn: Date | undefined;
}

export interface TodoListData {
    userId: number;
    title: string;
    desc: string | null;
    createdAt: Date | null;
    expiresIn: Date | null;
}
