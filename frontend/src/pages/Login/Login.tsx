import { Alert, AlertTitle, Button, Divider, Grid, Snackbar } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { useMutation } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import api from '../../utils/api/api.class';
import type { LoginData } from '../../utils/api/api.types';
import apiStorage from '../../utils/apiStorage.class';

const Login = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const {
    data,
    mutate: login,
    isSuccess,
    isError,
    error
  } = useMutation((data: LoginData) => api.login(data));

  if (apiStorage.token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (isSuccess) {
      apiStorage.setLoginData(data);
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log((error as AxiosError<{ message: string }>).response?.data?.message);
      setOpenAlert(true);
    }
  }, [isError]);

  const LoginContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    <>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {isError ? (error as AxiosError<{ message: string }>).response?.data?.message : null}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
        <LoginContainer>
          <Paper elevation={6} sx={{ maxWidth: '30rem' }}>
            <FormContainer
              onSuccess={(data: LoginData) => {
                login({
                  email: data?.email,
                  password: data?.password
                });
              }}>
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
                  <TextFieldElement name="email" type="email" label="Email" fullWidth required />
                </Grid>
                <Grid item xs={10}>
                  <PasswordElement
                    name="password"
                    type="password"
                    label="Password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={10} sx={{ mt: '1rem', mb: '1rem' }}>
                  <Button variant="contained" type="submit" fullWidth>
                    Sign in
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <Divider textAlign="center">
                    Need an account? <Link to="/register">Sign up</Link>
                  </Divider>
                </Grid>
              </Grid>
            </FormContainer>
          </Paper>
        </LoginContainer>
      </Box>
    </>
  );
};

export default Login;
