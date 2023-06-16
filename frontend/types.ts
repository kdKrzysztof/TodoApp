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

export interface AddTodoForm {
  title: string;
  desc: string;
  important: boolean;
  pickedDate: Dayjs | null;
}

export interface AddTodoFormProps {
  setOpenDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  refetchTodos: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
}
