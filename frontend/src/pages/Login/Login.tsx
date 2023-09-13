import { Alert, AlertTitle, Button, Divider, Grid, Snackbar } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import type { AxiosError } from 'axios';
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { Link, Navigate } from 'react-router-dom';

import apiStorage from 'src/utils/apiStorage.class';

import { LoginContainer } from './Login.styles';
import useLoginUtils from './Login.utils';

import type { LoginData } from 'api.types';

const Login = () => {
  const { error, login, isError, setOpenAlert, openAlert } = useLoginUtils();

  // Check before login component renders
  if (apiStorage.token) {
    return <Navigate to="/" />;
  }

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
