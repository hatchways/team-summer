import React, { useState } from 'react';
import { makeStyles, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export const Toast = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.toggleToast(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={props.showToast || false}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{props.toastMessage || 'Placeholder text'}</span>}
      action={[
        <Button key="undo" color="secondary" size="small" onClick={handleClose}>
          {props.buttonText || 'CLOSE'}
        </Button>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

Toast.propTypes = {
  toastMessage: PropTypes.string,
  buttonText: PropTypes.string,
  toggleToast: PropTypes.func.isRequired,
  showToast: PropTypes.bool
};

export default Toast;
