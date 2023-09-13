import React from 'react';
import { useMutation } from 'react-query';

import { api } from 'src/utils';
import { LoginData } from 'src/utils/api/api.types';

const useLogin = () => {
  const {
    data,
    mutate: login,
    isSuccess,
    isError,
    error
  } = useMutation((data: LoginData) => api.login(data));

  return {
    data,
    login,
    isSuccess,
    isError,
    error
  };
};

export default useLogin;
