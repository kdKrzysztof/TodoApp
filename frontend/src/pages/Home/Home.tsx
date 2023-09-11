import AddIcon from '@mui/icons-material/Add';
import { Dialog, List, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import type { receivedTodos } from '../../../types';
import AddTodoForm from '../../components/AddTodoForm/AddTodoForm';
import TodoDialog from '../../components/TodoDialog/TodoDialog';
import TodoItem from '../../components/TodoItem';
import api from '../../utils/api.class';
import { getNewRefreshToken } from '../../utils/getNewRefreshToken';
import { CustomFab, ListMainBody } from './Home.styles';

const todoList = () => {
  const { data, isError, refetch } = useQuery(['todoData'], {
    queryFn: api.getTodos,
    retry: false
  });

  const navigate = useNavigate();
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

  const [openAddDialogState, setOpenAddDialogState] = useState(false);
  const openAddDialog = () => {
    setOpenAddDialogState(true);
  };
  const closeAddDialog = () => {
    setOpenAddDialogState(false);
  };

  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [openTodoDesc, setOpenTodoDesc] = useState(false);
  const [todoDetails, setTodoDetails] = useState<receivedTodos>();
  const closeTodoDescDialog = () => {
    setOpenTodoDesc(false);
  };

  return (
    <>
      <ListMainBody maxWidth={false}>
        <Paper>
          <List key="TodoList">
            {data?.data.map((e: receivedTodos) => {
              return (
                <TodoItem
                  userId={e.userId}
                  todoId={e.todoId}
                  title={e.title}
                  desc={e.desc}
                  important={e.important}
                  createdAt={e.createdAt}
                  expiresIn={e.expiresIn}
                  setTodoDetails={setTodoDetails}
                  setOpenTodoDesc={setOpenTodoDesc}
                />
              );
            })}
          </List>
        </Paper>
      </ListMainBody>
      <CustomFab variant="extended" color="primary" onClick={openAddDialog}>
        <AddIcon />
        Add Todo
      </CustomFab>
      <Dialog open={openTodoDesc} onClose={closeTodoDescDialog} fullScreen={dialogFullScreen}>
        <TodoDialog todoDetails={todoDetails} />
      </Dialog>
      <Dialog open={openAddDialogState} onClose={closeAddDialog} fullScreen={dialogFullScreen}>
        <AddTodoForm setOpenAddDialogState={setOpenAddDialogState} refetchTodos={refetch} />
      </Dialog>
    </>
  );
};

export default todoList;
