import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Categories, IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const moveToDo = (category: IToDo['category']) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <List sx={{ width: '100%', maxWidth: 'xs' }}>
      <ListItem>
        <ListItemText primary={`${text}`} />
        {category !== Categories.TO_DO && (
          <IconButton
            edge='end'
            aria-label='TO_DO'
            onClick={() => moveToDo(Categories.TO_DO)}
          >
            <FormatListBulletedIcon />
          </IconButton>
        )}
        {category !== Categories.DOING && (
          <IconButton
            edge='end'
            aria-label='DOING'
            onClick={() => moveToDo(Categories.DOING)}
          >
            <PlaylistAddIcon />
          </IconButton>
        )}
        {category !== Categories.DONE && (
          <IconButton
            edge='end'
            aria-label='DONE'
            onClick={() => moveToDo(Categories.DONE)}
          >
            <PlaylistAddCheckIcon />
          </IconButton>
        )}
        <IconButton edge='end' aria-label='delete' onClick={deleteToDo}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider variant='fullWidth' component='li' />
    </List>
  );
}

export default ToDo;
