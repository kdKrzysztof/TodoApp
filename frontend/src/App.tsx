import { CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Index from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
import { ThemeProvider } from '@emotion/react';
import { createContext, useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';

interface SidebarContextValue {
  menustate: boolean;
  setMenustate: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextValue>({
  menustate: false,
  setMenustate: () => {}
});

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Index />
  }
]);

const App = () => {
  const [menustate, setMenustate] = useState(false);
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeColor((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeColor
        }
      }),
    [themeColor]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <SidebarContext.Provider value={{ menustate, setMenustate }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Sidebar />
          <RouterProvider router={router} />
        </ThemeProvider>
      </SidebarContext.Provider>
    </ColorModeContext.Provider>
  );
};

export { App, ColorModeContext, SidebarContext };
