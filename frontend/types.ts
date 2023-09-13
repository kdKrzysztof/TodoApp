import type { Dayjs } from 'dayjs';

export interface receivedTodos {
  userId: number;
  todoId: number;
  title: string;
  desc: string;
  important: boolean;
  createdAt: Date;
  expiresIn: Date;
}

export interface AddNewTodo {
  title: string;
  desc: string;
  important: boolean;
  pickedDate: Dayjs | null;
}

export interface AddTodoFormProps {
  setOpenAddDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TodoDetails {
  todoDetails:
    | {
        userId: number;
        todoId: number;
        title: string;
        desc: string;
        important: boolean;
        createdAt: Date;
        expiresIn: Date;
      }
    | undefined;
}
