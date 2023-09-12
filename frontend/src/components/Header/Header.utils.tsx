import { useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';

import { ColorModeContext, SidebarContext } from 'src/App';

import { useAuth, useLogout } from './hooks';

const useHeaderUtils = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const { menustate, setMenustate } = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { auth, sidebarDisabled } = useAuth();
  const { logout } = useLogout();

  const handleAccountButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget);
  };

  const logoutButtonClick = () => {
    const refreshToken = sessionStorage.refreshToken;
    logout({ refreshToken: refreshToken });
  };

  return {
    sidebarDisabled,
    setMenustate,
    menustate,
    colorMode,
    theme,
    auth,
    anchorEl,
    open,
    logoutButtonClick,
    handleAccountButtonClick
  };
};

export default useHeaderUtils;
