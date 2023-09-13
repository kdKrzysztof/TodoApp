import { Avatar, Box, List, ListItem, SwipeableDrawer, styled, useTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const theme = useTheme();
const drawerWidth = 240;
export const CustomSwipeableDrawer = styled(SwipeableDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
});

export const UserDetailsListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '0.5rem',
  marginBottom: '0.5rem'
});

export const UserDetailsList = styled(List)({
  paddingTop: '5rem'
});

export const UserDetailsAvatar = styled(Avatar)([
  { width: 56, height: 56 },
  theme.palette.mode === 'light' ? { bgcolor: blue[500] } : { bgcolor: 'whitesmoke' }
]);

export const UserDetailsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem'
});
