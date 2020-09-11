import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogActions } from '@material-ui/core';
import Button from './inputs/Button';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function ConfirmModal({ history, isOpen, loading, config, closeModal }) {
  let onClose = () => {
    config.onCancel && config.onCancel();
    closeModal();
  };

  return (
    <Dialog
      onClose={!loading && onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="customized-dialog-title" onClose={!loading && onClose}>
        {config.titulo}
      </DialogTitle>
      <DialogContent dividers>
        {/* <LoginRegistroForm history={history} /> */}
        <p>{config.mensaje}</p>
      </DialogContent>
      <DialogActions>
        {!loading && (
          <Button
            onClick={() => {
              config.onCancel && config.onCancel();
              onClose();
            }}
            color="primary"
          >
            {config && config.cancelText ? config.cancelText : 'No'}
          </Button>
        )}
        <Button onClick={config.onConfirm} color="primary" loading={loading}>
          {config && config.confirmText ? config.confirmText : 'yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ confirmState }, props) => {
  const { isOpen, onConfirm, config, loading } = confirmState;
  return { isOpen, onConfirm, config, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_CONFIRM' }),
  };
};

ConfirmModal.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal);
