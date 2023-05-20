import axios from 'axios';
import { useMutation } from 'react-query';

const removeTodo = async (data: number) => {
  return await axios.delete(`api/todo/${data}`);
};

export const useRemoveTodo = () => {
  return useMutation((data: number) => removeTodo(data), {});
};
