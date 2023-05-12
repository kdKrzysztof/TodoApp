import axios from 'axios';
import { useMutation } from 'react-query';

interface RegisterData {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const postRegisterData = async (data: RegisterData) => {
  return await axios.post('api/auth/register', data);
};

export const useRegister = () => {
  return useMutation((data: RegisterData) => postRegisterData(data), {});
};
