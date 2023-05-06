import { Button, Divider, Grid, TextField, styled, useTheme } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useRef } from 'react';
import { useUserLogin } from '../hooks/useUserLogin';
import apiStorage from '../utils/apiStorage';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  sessionStorage.clear();

  const theme = useTheme();
  const navigate = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const { data, isLoading, mutate: login, isSuccess, isError, error } = useUserLogin();

  useEffect(() => {
    if (isSuccess) {
      apiStorage.setLoginData(data);
      navigate('/');
    }
  }, [isSuccess]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let email = emailInput.current?.value;
    let password = passwordInput.current?.value;

    login({ email: email, password: password });
  };

  styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2
  }));

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
          <form>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              p=".5rem"
              mb="2rem"
              color="white"
              bgcolor={[theme.palette.mode === 'light' ? blue[600] : 'inherit']}>
              Login
            </Typography>
            <Grid container display="flex" justifyContent="center" spacing={3}>
              <Grid item xs={10}>
                <TextField
                  inputRef={emailInput}
                  fullWidth
                  required
                  label="Email"
                  variant="standard"></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  inputRef={passwordInput}
                  fullWidth
                  required
                  type="password"
                  label="Password"
                  variant="standard"></TextField>
              </Grid>
              <Grid item xs={10} sx={{ mt: '1rem' }}>
                <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Divider textAlign="center">
                  Need an account? <Link to="/register">Click here!</Link>
                </Divider>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
