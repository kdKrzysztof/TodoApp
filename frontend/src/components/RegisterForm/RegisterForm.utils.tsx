import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiStorage from 'src/utils/apiStorage.class';

import { useRegister } from './hooks';

const useRegisterFormUtils = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  
  const { isError, error, isSuccess, register, data } = useRegister();

  useEffect(() => {
    if (isError) {
      setOpenAlert(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        apiStorage.setLoginData(data);
        navigate('/');
        return
      }
      setOpenAlert(true);
    }
  }, [isSuccess]);

  return {
    openAlert,
    setOpenAlert,
    isError,
    error,
    register
  };
};

export default useRegisterFormUtils;
