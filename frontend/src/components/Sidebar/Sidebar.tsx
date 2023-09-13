import { Divider, Typography } from '@mui/material';

import {
  CustomSwipeableDrawer,
  UserDetailsAvatar,
  UserDetailsBox,
  UserDetailsList,
  UserDetailsListItem
} from './Sidebar.styles';
import useSidebarUtils from './Sidebar.utils';

const Sidebar = () => {
  const { menustate, handleMenuOpen, handleMenuClose } = useSidebarUtils();

  return (
    <CustomSwipeableDrawer
      disableScrollLock
      variant="temporary"
      open={menustate}
      onClose={handleMenuClose}
      onOpen={handleMenuOpen}>
      <UserDetailsList>
        <Divider />
        <UserDetailsListItem>
          <UserDetailsAvatar variant="rounded">T</UserDetailsAvatar>
          <UserDetailsBox>
            <Typography variant="h6" fontWeight={'bold'}>
              Welcome!
            </Typography>
            <Typography variant="subtitle2">exampleuser</Typography>
          </UserDetailsBox>
        </UserDetailsListItem>
        <Divider />
      </UserDetailsList>
    </CustomSwipeableDrawer>
  );
};

export default Sidebar;
