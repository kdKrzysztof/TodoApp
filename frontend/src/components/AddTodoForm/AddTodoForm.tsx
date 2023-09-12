import CancelIcon from '@mui/icons-material/Cancel';
import {
  Alert,
  AlertTitle,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Snackbar
} from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { CheckboxElement, FormContainer, TextFieldElement } from 'react-hook-form-mui';

import { CustomDialogContent } from './AddTodoForm.styles';
import DatePicker from './DatePicker';
import { useNewTodo } from './hooks';

import type { AddNewTodo, AddTodoFormProps } from 'types';

const AddTodoForm = ({ setOpenAddDialogState }: AddTodoFormProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const { error, isError, newTodo } = useNewTodo({ setOpenAlert });

  const addNewTodo = async (data: AddNewTodo) => {
    newTodo({
      title: data?.title,
      desc: data?.desc,
      important: data?.important ?? false,
      expiresIn: data?.pickedDate?.format('YYYY-MM-DD HH:mm:ss.SSS ZZ') ?? null
    });
    setOpenAddDialogState(false);
  };

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
              <DatePicker />
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
