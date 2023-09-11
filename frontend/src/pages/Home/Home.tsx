import { useQuery } from 'react-query';
import api from '../../utils/api.class';
import { useEffect, useState } from 'react';
import { getNewRefreshToken } from '../../utils/getNewRefreshToken';
import { useNavigate } from 'react-router-dom';
import { receivedTodos } from '../../../types';
import {
  Container,
  Dialog,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import AddTodoForm from '../../components/AddTodoForm';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import TodoDialog from '../../components/TodoDialog';
import { ListMainBody, CustomListItem, CustomFab, CustomListItemButton } from './Home.styles';
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
  const openTodoDescDialog = (e: receivedTodos) => {
    setTodoDetails(e);
    setOpenTodoDesc(true);
  };
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
                <>
                  <CustomListItem key={e.todoId + e.title + e.todoId}>
                    <IconButton>{e.important ? <GradeIcon /> : <GradeOutlinedIcon />}</IconButton>
                    <ListItemButton onClick={() => openTodoDescDialog(e)} sx={{ height: '100%' }}>
                      <CustomListItemButton
                        primary={e.title}
                        secondary={e?.expiresIn?.toString()}
                      />
                    </ListItemButton>
                  </CustomListItem>
                </>
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
