import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  DialogActions,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import Button from '../common/inputs/Button';

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

function DeleteReservationConfirmModal({
  isOpen,
  loading,
  onConfirm,
  onCloseModal,
  onCancel,
  cancelText,
  confirmText,
}) {
  const [notificar, setNotificar] = useState(1);

  let onClose = () => {
    onCancel && onCancel();
    onCloseModal();
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
        Eliminar reserva
      </DialogTitle>
      <DialogContent dividers>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            ¿Deseas notificar a tus pasajeros de la cancelación de esta reserva?
          </FormLabel>
          <RadioGroup
            aria-label="avisar"
            name="avisar"
            value={notificar}
            onChange={e => setNotificar(+e.target.value)}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Sí, avisar."
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="No avisar (Considera esta opción si estas eliminando esta reserva para crearla de nuevo)."
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {!loading && (
          <Button onClick={onClose} color="primary">
            {cancelText ? cancelText : 'No'}
          </Button>
        )}
        <Button
          onClick={() => onConfirm(notificar)}
          color="primary"
          loading={loading}
        >
          {confirmText ? confirmText : 'yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteReservationConfirmModal.propTypes = {};

export default DeleteReservationConfirmModal;
