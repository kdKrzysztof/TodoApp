import {
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Snackbar,
  DialogActions,
  Divider,
  styled,
  IconButton
} from '@mui/material';
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
  DatePickerElement
} from 'react-hook-form-mui';
import { AddTodo } from '../utils/api.types';
import api from '../utils/api.class';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import { AxiosError } from 'axios';
import { isDayjs } from 'dayjs';
import type { AddTodoForm, AddTodoFormProps } from '../../types';

const AddTodoForm: React.FC<AddTodoFormProps> = ({ setOpenAddDialogState }) => {
  const queryClient = useQueryClient();
  const {
    mutate: newTodo,
    isError,
    error
  } = useMutation({
    mutationFn: (data: AddTodo) => api.addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoData'] });
    }
  });

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (isError) {
      setOpenAlert(true);
    }
  }, [isError]);

  const addNewTodo = async (data: AddTodoForm) => {
    newTodo({
      title: data?.title,
      desc: data?.desc,
      important: data?.important ?? false,
      expiresIn: data?.pickedDate?.format('YYYY-MM-DD HH:mm:ss.SSS ZZ') ?? null
    });
    setOpenAddDialogState(false);
  };

  const CustomDialogContent = styled(DialogContent)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {isError ? (error as AxiosError<{ message: string }>).response?.data?.message : null}
        </Alert>
      </Snackbar>
      <DialogTitle variant="h4" align="center">
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={1}></Grid>
          <Grid item xs>
            Add new Todo Task
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => {
                setOpenAddDialogState(false);
              }}>
              <CancelIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <CustomDialogContent>
        <FormContainer onSuccess={addNewTodo}>
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
                  validation={{
                    validate: (value) =>
                      isDayjs(value) && value.isValid() ? true : 'Invalid date format'
                  }}
                  parseError={(err) => {
                    return err?.message || 'Something went wrong';
                  }}
                />
              </LocalizationProvider>
              <CheckboxElement name="important" label="Important" />
            </Grid>
            <Grid item xs={8}>
              <DialogActions>
                <Button type="submit" fullWidth variant="contained">
                  Add Todo
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </FormContainer>
      </CustomDialogContent>
    </>
  );
};

export default AddTodoForm;
