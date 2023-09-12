import { AccountCircle } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { CustomAppBar, CustomGridContainer, GridTitle, GridTooltip } from './Header.styles';
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
    <CustomAppBar>
      <Toolbar>
        <CustomGridContainer container>
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
          <GridTitle item xs>
            <Typography variant="h4">To-Do List App</Typography>
          </GridTitle>
          <GridTooltip item xs={1}>
            <Tooltip title="Change theme">
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {auth ? (
              <Tooltip title={anchorEl ? '' : 'Open settings'}>
                <IconButton size="large" color="inherit" onClick={handleAccountButtonClick}>
                  <AccountCircle />
                  <Menu anchorEl={anchorEl} open={open} disableScrollLock>
                    <MenuItem onClick={logoutButtonClick}>Logout</MenuItem>
                  </Menu>
                </IconButton>
              </Tooltip>
            ) : null}
          </GridTooltip>
        </CustomGridContainer>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
