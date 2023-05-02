import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { ColorModeContext } from '../App';
import { SidebarContext } from '../App';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { menustate, setMenustate } = useContext(SidebarContext);

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between'
        }}>
        <IconButton
          color="inherit"
          onClick={() => {
            setMenustate(!menustate);
          }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4">To-Do List App</Typography>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
