import { Button, Divider, Grid, TextField } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import { useUserLogin } from '../hooks/useUserLogin';
import apiStorage from '../utils/apiStorage';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const { data, mutate: login, isSuccess } = useUserLogin();

  if (apiStorage.token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (isSuccess) {
      apiStorage.setLoginData(data);
      navigate('/');
    }
  }, [isSuccess]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    let email = emailInput.current?.value;
    let password = passwordInput.current?.value;

    login({ email: email, password: password });
  };

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
            width: 400,
            height: 'auto',
            pb: '2rem',
            pt: '2rem'
          }
        }}>
        <Paper elevation={6}>
          <form>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              p=".5rem"
              mb="1.5rem"
              color="inherit">
              Sign in
            </Typography>
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={10}>
                <TextField inputRef={emailInput} fullWidth required label="Email"></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  inputRef={passwordInput}
                  fullWidth
                  required
                  type="password"
                  label="Password"></TextField>
              </Grid>
              <Grid item xs={10} sx={{ mt: '1rem', mb: '1rem' }}>
                <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>
                  Sign in
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
