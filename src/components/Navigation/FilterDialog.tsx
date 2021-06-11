import React, { VFC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { tags } from 'data';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Container: VFC<Props> = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>表示したいタグを選択</DialogTitle>
    <DialogContent>
      <FormGroup>
        {tags.map((tag) => (
          <>
            <FormControlLabel
              control={<Checkbox checked={tag.checked} />}
              label={tag.tagName}
            />
          </>
        ))}
      </FormGroup>
    </DialogContent>
    <DialogActions>
      <Button variant="contained">フィルター</Button>
    </DialogActions>
  </Dialog>
);

export default Container;
