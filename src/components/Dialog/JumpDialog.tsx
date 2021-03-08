import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from '@material-ui/pickers';
import { Props as JumpButtonProps } from 'components/Navigation/JumpButton';

type ContainerProps = Omit<JumpButtonProps, 'handleClickOpen'>;

type Props = { props: ContainerProps };

const Component: FC<Props> = ({ props }) => {
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>指定した年月にジャンプ</DialogTitle>
        <DialogContent>
          <DatePicker
            label="○年○月"
            format="yyyy/MM"
            openTo="year"
            views={['year', 'month']}
            value={new Date()}
            onChange={() => {
              return 1;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            GO!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Container: FC<ContainerProps> = (props) => {
  return <Component props={props} />;
};

export default Container;
