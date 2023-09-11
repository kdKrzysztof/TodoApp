import { receivedTodos } from '../../../types';

export interface TodoItemParams extends receivedTodos {
  setTodoDetails: React.Dispatch<React.SetStateAction<receivedTodos | undefined>>;
  setOpenTodoDesc: React.Dispatch<React.SetStateAction<boolean>>;
}
