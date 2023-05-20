import axios from 'axios';
import { useMutation } from 'react-query';

export interface UpdateTitle {
  todoId: number;
  title: string | undefined;
}

const updateTitle = async (data: UpdateTitle) => {
  return await axios.post(`api/todo/updateTitle/${data.todoId}`, data.title);
};

export const useUpdateTitle = () => {
  return useMutation((data: UpdateTitle) => updateTitle(data), {});
};
