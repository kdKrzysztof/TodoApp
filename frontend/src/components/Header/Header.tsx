import { AccountCircle } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Grid, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import useHeaderUtils from './Header.utils';

const Header = () => {
  const {
    anchorEl,
    auth,
    colorMode,
    logoutButtonClick,
    menustate,
    setMenustate,
    sidebarDisabled,
    theme,
    open,
    handleAccountButtonClick
  } = useHeaderUtils();

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
