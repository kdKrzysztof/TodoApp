import axios from 'axios';
import { useMutation } from 'react-query';

export interface UpdateExpIn {
  todoId: number;
  expiresIn: Date | undefined;
}

const updateDesc = async (data: UpdateExpIn) => {
  return await axios.post(`api/todo/updateExpIn/${data.todoId}`, data.expiresIn);
};

export const useUpdateDesc = () => {
  return useMutation((data: UpdateExpIn) => updateDesc(data), {});
};
