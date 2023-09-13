import { useMutation } from 'react-query';
import { api } from 'src/utils';
import type { RegisterData } from 'api.types';

const useRegister = () => {
  const {
    data,
    mutate: register,
    isError,
    error,
    isSuccess
  } = useMutation((data: RegisterData) => api.register(data));

  return { register, isError, error, isSuccess, data };
};

export default useRegister;
