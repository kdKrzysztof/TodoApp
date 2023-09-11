import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/utils';
import { getNewRefreshToken } from 'src/utils/getNewRefreshToken';

import { receivedTodos } from 'types';

export const useHomeUtils = () => {
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

  return {
    data,
    setOpenTodoDesc,
    setTodoDetails,
    openTodoDesc,
    todoDetails,
    closeTodoDescDialog,
    refetch,
    openAddDialog,
    dialogFullScreen,
    openAddDialogState,
    closeAddDialog,
    setOpenAddDialogState
  };
};
