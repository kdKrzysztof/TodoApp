import { CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Index from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
import { ThemeProvider } from '@emotion/react';
import { createContext, useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { blue } from '@mui/material/colors';

interface SidebarContextValue {
  menustate: boolean;
  setMenustate: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextValue>({
  menustate: false,
  setMenustate: () => {}
});

const ColorModeContext = createContext({ toggleColorMode: () => {} });

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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </SidebarContext.Provider>
    </ColorModeContext.Provider>
  );
};

export { App, ColorModeContext, SidebarContext };
