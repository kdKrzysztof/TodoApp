import axios from 'axios';
import { useMutation } from 'react-query';

export interface UpdateImportant {
  todoId: number;
  important: boolean;
}

const updateImportant = async (data: UpdateImportant) => {
  return await axios.post(`api/todo/updateImportant/${data.todoId}`, data.important);
};

export const useUpdateImportant = () => {
  return useMutation((data: UpdateImportant) => updateImportant(data), {});
};
