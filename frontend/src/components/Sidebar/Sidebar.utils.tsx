import { useContext } from 'react';

import { SidebarContext } from 'src/App';

const useSidebarUtils = () => {
  const { menustate, setMenustate } = useContext(SidebarContext);

  const handleMenuOpen = () => {
    setMenustate(true);
  };
  const handleMenuClose = () => {
    setMenustate(false);
  };

  return {
    menustate,
    handleMenuClose,
    handleMenuOpen
  };
};

export default useSidebarUtils;
