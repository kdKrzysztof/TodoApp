import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import useGetNewRefreshToken from './hooks/useGetNewRefreshToken';
import useGetTodos from './hooks/useGetTodos';

import { receivedTodos } from 'types';

export const useHomeUtils = () => {
  const { isError, data, refetch } = useGetTodos();
  useGetNewRefreshToken({ isError, refetch });

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
    openAddDialog,
    dialogFullScreen,
    openAddDialogState,
    closeAddDialog,
    setOpenAddDialogState
  };
};
