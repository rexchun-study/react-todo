import ToDoList from './components/ToDoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { Reset } from 'styled-reset';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Reset />
        <ToDoList />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
