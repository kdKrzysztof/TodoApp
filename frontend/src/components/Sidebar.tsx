import { SwipeableDrawer } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from '../App';

const Sidebar = () => {
  const { menustate, setMenustate } = useContext(SidebarContext);

  const handleMenuOpen = () => {
    setMenustate(true);
  };
  const handleMenuClose = () => {
    setMenustate(false);
  };
  const drawerWidth = 240;
  return (
    <SwipeableDrawer
      variant="temporary"
      open={menustate}
      onClose={handleMenuClose}
      onOpen={handleMenuOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}>
      eeeeeeee
    </SwipeableDrawer>
  );
};

export { Sidebar };
