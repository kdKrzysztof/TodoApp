import { AppBar, Grid, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from '../App';
import { SidebarContext } from '../App';
import { AccountCircle } from '@mui/icons-material';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { menustate, setMenustate } = useContext(SidebarContext);
  const [sidebarDisabled, setSidebarDisabled] = useState(true);
  let localStorageAuth = sessionStorage.getItem('auth');

  useEffect(() => {
    setSidebarDisabled(localStorageAuth ? false : true);
  }, [localStorageAuth]);

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            {
              <IconButton
                color="inherit"
                disabled={sidebarDisabled}
                onClick={() => {
                  setMenustate(!menustate);
                }}>
                <MenuIcon />
              </IconButton>
            }
          </Grid>
          <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4">To-Do List App</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Change theme">
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton size="large" color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
