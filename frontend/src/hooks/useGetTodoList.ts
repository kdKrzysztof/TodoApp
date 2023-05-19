import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
import type { AxiosResponse } from 'axios';
import apiStorage from '../utils/apiStorage';

const fetchTodos = async (): Promise<AxiosResponse> => {
  const token = sessionStorage.getItem('token');

  const config = {
    headers: {
      ['x-access-token']: token
    }
  };

  return await axios.get('api/todo', config);
};

export const getTodoList = () => {
  return useQuery(['todoData'], {
    queryFn: fetchTodos,
    retry: false,
    
  });
};
