import { Container, Fab } from '@mui/material';
import { styled } from '@mui/system';

export const ListMainBody = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  marginTop: '2.5rem'
});

export const CustomFab = styled(Fab)({
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 30,
  left: 'auto',
  position: 'fixed'
});
