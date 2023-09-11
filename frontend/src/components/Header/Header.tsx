import {
  AppBar,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from '../../App';
import { SidebarContext } from '../../App';
import { AccountCircle } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import api from '../../utils/api.class';
import { LogoutData } from '../../utils/api.types';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { menustate, setMenustate } = useContext(SidebarContext);
  const [sidebarDisabled, setSidebarDisabled] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [auth, setAuth] = useState<Boolean>(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSidebarDisabled(sessionStorage?.token ? false : true);
    setAuth(sessionStorage?.token ? true : false);
  }, [location]);

  const handleAccountButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget);
  };

  const { mutate: logout, isSuccess } = useMutation((data: LogoutData) => api.logout(data));

  const logoutButtonClick = () => {
    const refreshToken = sessionStorage.refreshToken;
    logout({ refreshToken: refreshToken });
  };

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.clear();
      navigate('/login');
    }
  }, [isSuccess]);

  return (
    <AppBar
      component="nav"
      position="static"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <IconButton
              color="inherit"
              disabled={sidebarDisabled}
              onClick={() => {
                setMenustate(!menustate);
              }}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4">To-Do List App</Typography>
          </Grid>
          <Grid item xs={1} display="flex" sx={{ justifyContent: 'flex-end', width: '100%' }}>
            <Tooltip title="Change theme">
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {auth ? (
              <Tooltip title={anchorEl ? '' : 'Open settings'}>
                <IconButton size="large" color="inherit" onClick={handleAccountButtonClick}>
                  <AccountCircle />
                  <Menu anchorEl={anchorEl} open={open}>
                    <MenuItem onClick={logoutButtonClick}>Logout</MenuItem>
                  </Menu>
                </IconButton>
              </Tooltip>
            ) : null}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
