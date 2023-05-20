import axios from 'axios';
import { useMutation } from 'react-query';

export interface UpdateDesc {
  todoId: number;
  desc: string | undefined;
}

const updateDesc = async (data: UpdateDesc) => {
  return await axios.post(`api/todo/updateDesc/${data.todoId}`, data.desc);
};

export const useUpdateDesc = () => {
  return useMutation((data: UpdateDesc) => updateDesc(data), {});
};
