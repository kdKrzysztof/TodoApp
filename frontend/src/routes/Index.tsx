import { useQuery } from 'react-query';
import api from '../utils/api.class';
import { useEffect, useState } from 'react';
import { getNewRefreshToken } from '../utils/getNewRefreshToken';
import { useNavigate } from 'react-router-dom';
import { receivedTodos } from '../../types';
import {
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import AddTodoForm from '../components/AddTodoForm';

const todoTable = () => {
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

  const [openDialogState, setOpenDialogState] = useState(false);
  const openDialog = () => {
    setOpenDialogState(true);
  };
  const closeDialog = () => {
    setOpenDialogState(false);
  };

  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const TableMainBody = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    '& div': {
      minWidth: '20rem',
      width: '100vw',
      maxWidth: '60vw'
    }
  });

  return (
    <>
      <TableMainBody>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TodoId</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell size="small" align="center" width="1rem">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="info"
                    onClick={openDialog}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((e: receivedTodos) => {
                console.log(e);
                return (
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={e.todoId}>
                    <TableCell>{e.todoId}</TableCell>
                    <TableCell>{e.title}</TableCell>
                    <TableCell colSpan={2}>{e.desc}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TableMainBody>
      <Dialog open={openDialogState} onClose={closeDialog} fullScreen={dialogFullScreen}>
        <AddTodoForm setOpenDialogState={setOpenDialogState} refetchTodos={refetch} />
      </Dialog>
    </>
  );
};

export default todoTable;
