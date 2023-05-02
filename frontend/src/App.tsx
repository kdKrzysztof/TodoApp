import { CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Index from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
import { ThemeProvider } from '@emotion/react';
import { createContext, useState, useMemo } from 'react';

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
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { App, ColorModeContext };
