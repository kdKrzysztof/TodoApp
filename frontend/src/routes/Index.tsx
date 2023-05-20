import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getTodoList } from '../hooks/useGetTodoList';
import { receivedTodos } from '../../types';
import { getNewRefreshToken } from '../utils/getNewRefreshToken';
import { useQuery } from 'react-query';
import api from '../utils/api.class';

const Index = () => {
  const navigate = useNavigate();
  const { data, isError, isSuccess, refetch } = useQuery(['todoData'], {
    queryFn: api.getTodos,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      (async () => {
        const result = await getNewRefreshToken();
        if (result === false) {
          sessionStorage.clear();
          navigate('/login');
        }
        refetch();
      })();
    }
  }, [isError]);

  return (
    <div>
      {isSuccess &&
        data.data.map((e: receivedTodos) => {
          return <div key={e.todoId}>{e.desc}</div>;
        })}
    </div>
  );
};

export default Index;
