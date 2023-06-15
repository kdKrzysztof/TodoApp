import apiStorage from './apiStorage';
import api from './api.class';

export const getNewRefreshToken = async () => {
  const refToken = sessionStorage.getItem('refreshToken');

  try {
    const newData = await api.getRefreshToken(refToken);

    if (newData.status === 200) {
      apiStorage.setRefreshToken(newData);
    }
  } catch (err) {
    return false;
  }
};
