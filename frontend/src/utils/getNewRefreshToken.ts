import axios, { AxiosRequestConfig } from 'axios';
import apiStorage from './apiStorage';

export const getNewRefreshToken = async () => {
  const refToken = sessionStorage.getItem('refreshToken');

  try {
    const newData = await axios.post('api/auth/refreshToken', {
      refreshToken: refToken as AxiosRequestConfig<string>
    });
    if (newData.status === 200) {
      apiStorage.setRefreshToken(newData);
    }
  } catch (err) {
    return false;
  }
};
