import { Typography, Grid, TextField, Button } from '@mui/material';
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement
} from 'react-hook-form-mui';
import { useRegister } from '../hooks/useRegister';
import type { RegisterData } from '../../types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiStorage from '../utils/apiStorage';

const RegisterForm = () => {
  const { data, mutate: register, isError, error, isSuccess } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      apiStorage.setLoginData(data);
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <FormContainer
      defaultValues={{
        name: ''
      }}
      onSuccess={(data: RegisterData) => {
        console.log(data);
        register({
          username: data?.username,
          email: data?.email,
          password: data?.password
        });
      }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        p=".5rem"
        mb="2rem"
        color="inherit">
        Register
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={10}>
          <TextFieldElement
            name="username"
            label="Username"
            required
            fullWidth
            validation={{
              maxLength: { value: 30, message: 'Username must be shorter than 30 characters' },
              minLength: { value: 3, message: 'Username must be longer than 3 characters' },
              pattern: {
                value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gi,
                message: `Username cannot contain special characters`
              }
            }}
            parseError={(err) => {
              return err?.message || 'Something went wrong';
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextFieldElement type="email" name="email" label="E-mail" fullWidth required />
        </Grid>
        <Grid item xs={10}>
          <PasswordElement
            type="password"
            name="password"
            label="Password"
            fullWidth
            required
            validation={{
              pattern:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,40}$/
            }}
            parseError={() => {
              return 'Password must contain 8 to 40 characters, contain 1 uppercase letter, 1 number and 1 symbol.';
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <PasswordRepeatElement
            passwordFieldName="password"
            name="repassword"
            label="Re-password"
            type="password"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={10} sx={{ mt: '1rem' }}>
          <Button type="submit" fullWidth variant="contained">
            Register
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default RegisterForm;
