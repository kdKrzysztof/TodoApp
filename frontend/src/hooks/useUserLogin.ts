import axios from 'axios';
import { useMutation } from 'react-query';

interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

const postUserData = async (data: LoginData) => {
  let dataJSON = {
    email: data.email,
    password: data.password
  };
  const res = await axios.post('api/auth/login', dataJSON);

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};
