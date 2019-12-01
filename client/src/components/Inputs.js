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
          <Typography variant="h6" style={{ color: '#000000' }} component="p">
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

const CustomOutlinedInput = (props) => {
  return (
    <TextField
      id={props.id || `input-${props.label}`}
      name={props.name}
      value={props.value}
      label={props.label}
      type={props.type || 'text'}
      margin="normal"
      variant="outlined"
      fullWidth
      autoComplete={props.autocomplete || 'false'}
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
  autocomplete: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string
};

export {
  OutlinedSelect,
  CustomOutlinedInput
};