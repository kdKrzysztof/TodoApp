import { IconButton, ListItemButton } from '@mui/material';
import { CustomListItem } from '../../pages/Home/Home.styles';
import { CustomListItemButton } from './TodoItem.styles';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import type { TodoItemParams } from './TodoItem.types';
import { receivedTodos } from '../../../types';
const TodoItem = ({
  todoId,
  title,
  important,
  createdAt,
  desc,
  userId,
  expiresIn,
  setTodoDetails,
  setOpenTodoDesc
}: TodoItemParams) => {
  const openTodoDescDialog = (e: receivedTodos) => {
    setTodoDetails(e);
    setOpenTodoDesc(true);
  };
  return (
    <CustomListItem key={todoId + title + todoId}>
      <IconButton>{important ? <GradeIcon /> : <GradeOutlinedIcon />}</IconButton>
      <ListItemButton
        onClick={() =>
          openTodoDescDialog({ todoId, createdAt, desc, userId, title, important, expiresIn })
        }
        sx={{ height: '100%' }}>
        <CustomListItemButton primary={title} secondary={expiresIn?.toString()} />
      </ListItemButton>
    </CustomListItem>
  );
};

export default TodoItem;
