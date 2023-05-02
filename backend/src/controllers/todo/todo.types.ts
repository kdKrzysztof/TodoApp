export interface AddTodo {
    title: string;
    desc: string;
    important: boolean;
    expiresIn: Date | undefined;
}

export interface TodoListData {
    userId: number;
    title: string;
    desc: string | null;
    important: boolean;
    createdAt: Date | null;
    expiresIn: Date | null;
}
