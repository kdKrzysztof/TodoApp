import { Box, styled } from '@mui/material';

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  height: '100%',
  ['& > :not(style)']: {
    margin: theme.spacing(1),
    height: 'auto',
    paddingTop: '2rem',
    paddingBottom: '2rem'
  }
}));
