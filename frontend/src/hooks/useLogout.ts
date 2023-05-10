import axios from 'axios';
import { useMutation } from 'react-query';

interface LogoutData {
  refreshToken: string | undefined;
}

const postUserData = async (data: LogoutData) => {
  return await axios.post('api/auth/logout', data);
};

export const useLogout = () => {
  return useMutation((data: LogoutData) => postUserData(data), {});
};
