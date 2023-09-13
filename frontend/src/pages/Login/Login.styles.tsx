import { Box, Grid, Paper, Typography, styled } from '@mui/material';

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

export const LoginPaper = styled(Paper)({
  maxWidth: '30rem'
});

export const LoginBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
});

export const LoginTitle = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '.5rem',
  marginBottom: '1.5rem',
  color: 'inherit'
});

export const LoginFormGridContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'center'
});

export const LoginButtonGrid = styled(Grid)({
  marginTop: '1rem',
  marginBottom: '1rem'
});
