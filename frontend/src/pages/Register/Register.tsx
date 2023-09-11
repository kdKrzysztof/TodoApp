import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Navigate } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import apiStorage from '../../utils/apiStorage';

const Register = () => {
  if (apiStorage.token) {
    return <Navigate to="/" />;
  }

  const RegisterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100%',
    '& > :not(style)': {
      margin: theme.spacing(1),
      height: 'auto',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <RegisterContainer>
        <Paper elevation={6} sx={{ maxWidth: '30rem' }}>
          <RegisterForm />
        </Paper>
      </RegisterContainer>
    </Box>
  );
};

export default Register;
