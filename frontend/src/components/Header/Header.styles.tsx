import { AppBar, Grid, styled } from '@mui/material';

export const CustomAppBar = styled(AppBar)({
  position: 'static',
  color: 'primary',
  overflowX: 'hidden',
  textAlign: 'center'
});

export const CustomGridContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
});

export const GridTitle = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const GridTooltip = styled(Grid)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
});
