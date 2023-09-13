import { useState } from 'react';

import { useNewTodo } from './hooks';

import { AddNewTodo, AddTodoFormProps } from 'types';

const useAddTodoFormUtils = ({ setOpenAddDialogState }: AddTodoFormProps) => {
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

  return {
    addNewTodo,
    setOpenAlert,
    isError,
    error,
    openAlert
  };
};

export default useAddTodoFormUtils;
