import { ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

export const CustomListItemButton = styled(ListItemText)({
  ['.MuiListItemText-primary']: {
    fontSize: '1.1rem'
  }
});

export const CustomListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '1rem'
});