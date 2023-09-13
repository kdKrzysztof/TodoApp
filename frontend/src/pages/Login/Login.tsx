import { Alert, AlertTitle, Button, Divider, Grid, Snackbar } from '@mui/material';
import { Box } from '@mui/material';
import type { AxiosError } from 'axios';
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { Link, Navigate } from 'react-router-dom';

import apiStorage from 'src/utils/apiStorage.class';

import {
  LoginBox,
  LoginButtonGrid,
  LoginContainer,
  LoginFormGridContainer,
  LoginPaper,
  LoginTitle
} from './Login.styles';
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
      <LoginBox>
        <LoginContainer>
          <LoginPaper elevation={6}>
            <FormContainer
              onSuccess={(data: LoginData) => {
                login({
                  email: data?.email,
                  password: data?.password
                });
              }}>
              <LoginTitle variant="h4">Sign in</LoginTitle>
              <LoginFormGridContainer container spacing={2}>
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
                <LoginButtonGrid item xs={10}>
                  <Button variant="contained" type="submit" fullWidth>
                    Sign in
                  </Button>
                </LoginButtonGrid>
                <Grid item xs={10}>
                  <Divider textAlign="center">
                    Need an account? <Link to="/register">Sign up</Link>
                  </Divider>
                </Grid>
              </LoginFormGridContainer>
            </FormContainer>
          </LoginPaper>
        </LoginContainer>
      </LoginBox>
    </>
  );
};

export default Login;
