import { TodoDetails } from '../../../types';
import { DialogContent, DialogTitle, Divider } from '@mui/material';
import { CustomDialogContent } from './TodoDialog.styles';

const TodoDialog: React.FC<TodoDetails> = ({ todoDetails }) => {
  return (
    <CustomDialogContent>
      <DialogTitle>{todoDetails?.title}</DialogTitle>
      <Divider />
      <DialogContent>{todoDetails?.desc}</DialogContent>
    </CustomDialogContent>
  );
};

export default TodoDialog;
