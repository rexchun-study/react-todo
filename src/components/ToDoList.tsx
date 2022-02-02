import { useRecoilValue } from 'recoil';
import { useContext } from 'react';

import { Box, Container, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '../App';
import { toDoSelector } from '../atoms';
import Category from './Category';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import CreateCategory from './CreateCategory';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        {theme.palette.mode.toUpperCase()} Mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color='inherit'
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <CreateCategory />
      <br />
      <Container
        maxWidth='xs'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Category />
        <CreateToDo />
      </Container>

      <Container maxWidth='xs'>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>
    </Box>
  );
}

export default ToDoList;
