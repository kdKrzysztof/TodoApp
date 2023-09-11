import AddIcon from '@mui/icons-material/Add';
import { Dialog, List, Paper } from '@mui/material';

import { TodoDialog } from 'components';
import { AddTodoForm } from 'components';
import { TodoItem } from 'components';

import { CustomFab, ListMainBody } from './Home.styles';
import { useHomeUtils } from './Home.utils';

import type { receivedTodos } from 'types';

const todoList = () => {
  const {
    closeTodoDescDialog,
    data,
    openTodoDesc,
    refetch,
    setOpenTodoDesc,
    setTodoDetails,
    todoDetails,
    closeAddDialog,
    dialogFullScreen,
    openAddDialog,
    openAddDialogState,
    setOpenAddDialogState
  } = useHomeUtils();
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
                  key={e.todoId}
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
