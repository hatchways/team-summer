import React from 'react';
import { InputLabel, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const outlinedSelectStyles = makeStyles({
  select: {
    marginRight: 50
  }
});

const OutlinedSelect = (props) => {
  const handleSelect = (callback) => (event) => callback(event);
  const classes = outlinedSelectStyles();

  return (
    <React.Fragment>
      {props.useLabel && (
        <InputLabel id={`${props.selectId}-label`} {...props.labelProps}>
          <Typography variant="body1" style={{ color: '#000000' }} component="p">
            {props.labelText}
          </Typography>
        </InputLabel>
      )}
      <Select
        native
        value={props.value}
        id={props.selectId}
        name={props.selectName}
        labelId={`${props.selectId}-label`}
        onChange={handleSelect(props.setState)}
        variant="outlined"
        disabled={props.disabled || false}
        classes={{
          select: classes.select
        }}
        {...props.selectProps}
      >
        {props.children}
      </Select>
    </React.Fragment>
  );
};

OutlinedSelect.propTypes = {
  children: PropTypes.node.isRequired,
  selectName: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  selectProps: PropTypes.object,
  labelProps: PropTypes.object,
  disabled: PropTypes.bool,
  useLabel: PropTypes.bool
};

const outlineInputStyles = makeStyles({
  input: {
    paddingTop: 4
  }
});

const CustomOutlinedInput = (props) => {
  const { id = `input-${props.label}`, type = 'text', autoComplete = 'false' } = props;
  const classes = outlineInputStyles();

  return (
    <TextField
      id={id}
      type={type}
      margin="normal"
      variant="outlined"
      fullWidth
      autoComplete={autoComplete}
      classes={{
        root: classes.input
      }}
      {...props}
    />
  );
};

CustomOutlinedInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autocomplete: PropTypes.oneOf(['true', 'false']),
  id: PropTypes.string,
  type: PropTypes.string
};

export {
  OutlinedSelect,
  CustomOutlinedInput
};