import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/utils';

import { LogoutData } from 'api.types';
import { useEffect } from 'react';

const useLogout = () => {
  const navigate = useNavigate();
  
  const { mutate: logout, isSuccess } = useMutation((data: LogoutData) => api.logout(data));
  
  useEffect(() => {
    if (isSuccess) {
      sessionStorage.clear();
      navigate('/login');
    }
  }, [isSuccess]);
  
  return {
    logout,
  };
};

export default useLogout;
