import React from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  success: {
    color: '#3b3b3b',
    backgroundColor: theme.primary
  },
  neutral: {
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  warning: {
    color: '#3b3b3b',
    backgroundColor: '#fff67b'
  },
  error: {
    backgroundColor: '#ff4b46'
  },
  buttonStyle: {
    cursor: 'pointer',
    padding: theme.spacing(1)
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
        vertical: 'top',
        horizontal: 'center'
      }}
      open={props.showToast || false}
      autoHideDuration={2000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
        className: `classes.toastStyles, ${classes[props.variant || 'neutral']}`
      }}
      message={<span id="message-id">{capitalize(props.toastMessage) || 'Placeholder text'}</span>}
      action={
        <div className={classes.buttonStyle} onClick={handleClose}>
          {props.buttonText || 'CLOSE'}
        </div>
      }
    />
  );
};

Toast.propTypes = {
  toastMessage: PropTypes.string,
  buttonText: PropTypes.string,
  toggleToast: PropTypes.func.isRequired,
  showToast: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'neutral', 'warning', 'error'])
};

export default Toast;
