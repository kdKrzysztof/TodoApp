import { api } from 'utils';

import apiStorage from './apiStorage.class';

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
