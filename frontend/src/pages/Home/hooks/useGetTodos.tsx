import { useQuery } from 'react-query';

import { api } from 'utils';

const useGetTodos = () => {
  const { data, isError, refetch } = useQuery(['todoData'], {
    queryFn: api.getTodos,
    retry: false
  });

  return { data, isError, refetch };
};

export default useGetTodos;
