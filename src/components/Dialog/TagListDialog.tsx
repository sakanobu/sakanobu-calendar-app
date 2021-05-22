import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { tags } from 'data';

export type Props = {
  open: boolean;
  handleClose: () => void;
};

const TagListDialog: FC<Props> = ({ open, handleClose }) => (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
    <DialogTitle>
      タグの追加/編集/削除
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </DialogTitle>
    <DialogContent>
      <List>
        {tags.map((tag) => (
          // <ListItem divider key={i}>
          <ListItem key={tag.tagID} divider>
            <ListItemText>{tag.tagName}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton color="inherit" edge="end">
                <CreateIcon />
              </IconButton>
              <IconButton color="secondary" edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </DialogContent>
  </Dialog>
);

export default TagListDialog;
