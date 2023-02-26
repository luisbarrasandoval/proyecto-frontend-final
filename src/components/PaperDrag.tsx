import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

interface PaperDragProps extends PaperProps {
  cancelClass?: string
  handle?: string
}

const  PaperDrag = ({
  cancelClass = "MuiDialogContent-root",
  handle = "#draggable-dialog-title",
  ...props
}: PaperDragProps) => {
  return (
    <Draggable
      handle={handle}
      cancel={`[class*="${cancelClass}"]`}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default PaperDrag;