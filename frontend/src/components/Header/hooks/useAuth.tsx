import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const useAuth = () => {
  const location = useLocation();
  const [sidebarDisabled, setSidebarDisabled] = useState(true);
  const [auth, setAuth] = useState<Boolean>(false);
  
  useEffect(() => {
    setSidebarDisabled(sessionStorage?.token ? false : true);
    setAuth(sessionStorage?.token ? true : false);
  }, [location]);

  return {
    sidebarDisabled, auth
  }
}

export default useAuth