import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getTodoList } from '../hooks/useGetTodoList';
import { receivedTodos } from '../../types';
import apiStorage from '../utils/apiStorage';

const Index = () => {
  const navigate = useNavigate();
  const { data, isError, isSuccess } = getTodoList();

  useEffect(() => {
    if (!apiStorage.token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (isError) {
      sessionStorage.clear();
      navigate('/login');
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
