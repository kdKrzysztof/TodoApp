import axios from 'axios';
import { useMutation } from 'react-query';

interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

const postUserData = async (data: LoginData) => {
  return await axios.post('api/auth/login', data);
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};
