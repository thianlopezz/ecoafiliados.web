import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import LoginRegistroForm from './LoginRegistroForm';

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

function LoginModal({ history, showLoginModal, hideModal }) {
  return (
    <Dialog
      onClose={hideModal}
      aria-labelledby="customized-dialog-title"
      open={showLoginModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title" onClose={hideModal}>
        Login
      </DialogTitle>
      <DialogContent dividers>
        <LoginRegistroForm history={history} />
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = ({ loginState }, props) => {
  const { showLoginModal } = loginState;
  return { showLoginModal };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch({ type: 'SHOW_LOGIN_MODAL', show: false }),
  };
};

LoginModal.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
