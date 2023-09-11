import { Avatar, Box, Divider, List, ListItem, SwipeableDrawer, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useContext } from 'react';

import { SidebarContext } from '../../App';

const Sidebar = () => {
  const { menustate, setMenustate } = useContext(SidebarContext);
  const theme = useTheme();

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
      <List sx={{ paddingTop: '5rem' }}>
        <Divider />
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: '0.5rem',
            mb: '0.5rem'
          }}>
          <Avatar
            variant="rounded"
            sx={[
              { width: 56, height: 56 },
              theme.palette.mode === 'light' ? { bgcolor: blue[500] } : { bgcolor: 'whitesmoke' }
            ]}>
            T
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1rem' }}>
            <Typography variant="h6" fontWeight={'bold'}>
              Welcome!
            </Typography>
            <Typography variant="subtitle2">exampleuser</Typography>
          </Box>
        </ListItem>
        <Divider />
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
