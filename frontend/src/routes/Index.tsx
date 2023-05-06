import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { getTodoList } from '../hooks/getTodoList';
import { receivedTodos } from '../../types';
import apiStorage from '../utils/apiStorage';

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = getTodoList();

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
