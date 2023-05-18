import { Button, Divider, Grid } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { useEffect} from 'react';
import { useUserLogin } from '../hooks/useUserLogin';
import apiStorage from '../utils/apiStorage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import type { LoginData } from '../../types';

const Login = () => {
  const navigate = useNavigate();
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
                  Need an account? <Link to="/register">Click here!</Link>
                </Divider>
              </Grid>
            </Grid>
          </FormContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
