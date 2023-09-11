import type { AxiosResponse } from 'axios';
import type { Dayjs } from 'dayjs';
import type { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

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
  refetchTodos: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
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
