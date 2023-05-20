import axios from 'axios';
import { useMutation } from 'react-query';

export interface AddTodo {
  title: string;
  desc: string;
  important: boolean;
  expiresIn: Date | undefined;
}

const addTodo = async (data: AddTodo) => {
  return await axios.post('api/todo', data);
};

export const useAddTodo = () => {
  return useMutation((data: AddTodo) => addTodo(data), {});
};
