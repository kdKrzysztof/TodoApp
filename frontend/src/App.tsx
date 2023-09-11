import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Suspense, createContext, useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// const Index = lazy(() => import('./pages/Home'));
// const Register = lazy(() => import('./pages/Register'));
// const Login = lazy(() => import('./pages/Login'));
// ^^ turned off lazy loading because of messy css loading

interface SidebarContextValue {
  menustate: boolean;
  setMenustate: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextValue>({
  menustate: false,
  setMenustate: () => {}
});

const ColorModeContext = createContext({ toggleColorMode: () => {} });

//----------------------------------------------------------//

const App = () => {
  const [menustate, setMenustate] = useState(false);
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>(
    (localStorage.getItem('themeColor') as 'light' | 'dark') ?? 'light'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeColor((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeColor,
          ...(themeColor === 'light'
            ? { primary: { main: blue[600] } }
            : {
                primary: { main: blue[400] }
              })
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
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<></>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<></>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<></>}>
                  <Register />
                </Suspense>
              }
            />
          </Routes>
        </ThemeProvider>
      </SidebarContext.Provider>
    </ColorModeContext.Provider>
  );
};

export { App, ColorModeContext, SidebarContext };
