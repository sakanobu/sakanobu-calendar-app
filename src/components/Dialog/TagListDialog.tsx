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
import { Props as TagListProps } from 'components/Navigation/TagListButton';
import { tags } from 'data';

type ContainerProps = Omit<TagListProps, 'handleClickOpen'>;

type Props = { props: ContainerProps };

const Component: FC<Props> = ({ props }) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle>
          タグの追加/編集/削除
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </DialogTitle>
        <DialogContent>
          <List>
            {tags.map((tag, i) => {
              return (
                <ListItem divider key={i}>
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
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Container: FC<ContainerProps> = (props) => {
  return <Component props={props} />;
};

export default Container;
