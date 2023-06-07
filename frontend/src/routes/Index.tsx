import { useQuery } from 'react-query';
import api from '../utils/api.class';
import { useEffect } from 'react';
import { getNewRefreshToken } from '../utils/getNewRefreshToken';
import { useNavigate } from 'react-router-dom';
import { receivedTodos } from '../../types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/system';

const todoTable = () => {
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
    <TableMainBody>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >TodoId</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Desc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              data.data.map((e: receivedTodos) => {
                return (
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>{e.todoId}</TableCell>
                    <TableCell>{e.desc}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </TableMainBody>
  );
};

export default todoTable;
