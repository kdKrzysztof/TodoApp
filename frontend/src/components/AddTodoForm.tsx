import {
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Snackbar,
  DialogActions
} from '@mui/material';
import { AxiosError } from 'axios';
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
  DatePickerElement
} from 'react-hook-form-mui';
import { AddTodo } from '../utils/api.types';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.class';
import apiStorage from '../utils/apiStorage';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddTodoForm = () => {
  const {
    data,
    mutate: newTodo,
    isError,
    error,
    isSuccess
  } = useMutation((data: AddTodo) => api.addTodo(data));

  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setOpenAlert(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      apiStorage.setLoginData(data);
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {isError ? (error as AxiosError<{ message: string }>).response?.data?.message : null}
        </Alert>
      </Snackbar>
      <DialogTitle variant="h4" align="center">
        Add new Todo Task
      </DialogTitle>
      <DialogContent>
        <FormContainer
          onSuccess={(data: AddTodo) => {
            console.log({
              title: data?.title,
              desc: data?.desc,
              important: data?.important,
              expiresIn: data?.pickedDate?.format('YYYY-MM-DD HH:mm:ss.SSS ZZ') ?? null
            });
          }}>
          <Grid container justifyContent="center" spacing={2} marginTop={0}>
            <Grid item xs={8}>
              <TextFieldElement name="title" label="Title" variant="outlined" required fullWidth />
            </Grid>
            <Grid item xs={8}>
              <TextFieldElement
                name="desc"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerElement
                  name="pickedDate"
                  label="Expiration Date"
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              <CheckboxElement name="important" label="Important" />
            </Grid>
            <Grid item xs={8} sx={{ mt: '1rem' }}>
              <DialogActions>
                <Button type="submit" fullWidth variant="contained">
                  Add Todo
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </FormContainer>
      </DialogContent>
    </>
  );
};

export default AddTodoForm;
