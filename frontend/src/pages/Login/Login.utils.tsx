import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiStorage from 'src/utils/apiStorage.class';

import { useLogin } from './hooks';

const useLoginUtils = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const { data, error, isError, login, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        apiStorage.setLoginData(data);
        navigate('/');
        return;
      }
      setOpenAlert(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log((error as AxiosError<{ message: string }>).response?.data?.message);
      setOpenAlert(true);
    }
  }, [isError]);

  return {
    error,
    login,
    isError,
    setOpenAlert,
    openAlert
  };
};

export default useLoginUtils;
