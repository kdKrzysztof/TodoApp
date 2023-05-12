import { Button, Grid, TextField, useTheme } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100vw',
        height: '100%'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
            height: 'auto',
            pt: '2rem',
            pb: '2rem'
          }
        }}>
        <Paper elevation={6}>
          <RegisterForm/>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
