import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from 'utils';
import type { AddTodo } from 'utils/api/api.types';

import type { UseNewTodoProps } from './useNewTodo.types';

const useNewTodo = ({ setOpenAlert }: UseNewTodoProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: newTodo,
    isError,
    error
  } = useMutation({
    mutationFn: (data: AddTodo) => api.addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoData'] });
    }
  });

  useEffect(() => {
    if (isError) {
      setOpenAlert(true);
    }
  }, [isError]);

  return { newTodo, isError, error };
};

export default useNewTodo;
