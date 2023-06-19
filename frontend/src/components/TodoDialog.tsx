import { styled } from '@mui/system';
import { DialogContent, DialogTitle, Divider } from '@mui/material';
import { TodoDetails } from '../../types';

const TodoDialog: React.FC<TodoDetails> = ({ todoDetails }) => {
  const CustomDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  });
  return (
    <CustomDialogContent>
      <DialogTitle>{todoDetails?.title}</DialogTitle>
      <Divider />
      <DialogContent>{todoDetails?.desc}</DialogContent>
    </CustomDialogContent>
  );
};

export default TodoDialog;
