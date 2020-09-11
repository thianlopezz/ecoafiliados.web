import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import NumberFormat from 'react-number-format';

function DecimalFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      decimalScale={2}
    />
  );
}

DecimalFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function IntegerFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      decimalScale={0}
    />
  );
}

IntegerFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Input = ({
  label,
  name,
  type,
  value,
  className,
  disabled,
  textColor,
  multiline,
  placeholder,
  rows,
  error,
  variant,
  onChange,
  endAdornment,
}) => {
  let InputProps;
  if (type === 'decimal') {
    InputProps = {
      name,
      inputComponent: DecimalFormat,
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    };
  }

  if (type === 'integer') {
    InputProps = { name, inputComponent: IntegerFormat };
  }

  if (endAdornment) {
    InputProps = InputProps
      ? { ...InputProps, endAdornment }
      : { endAdornment };
  }

  return (
    <div className="form-group">
      <TextField
        id={name}
        name={name}
        placeholder={placeholder}
        label={label}
        fullWidth
        type={type || 'text'}
        value={value || ''}
        disabled={disabled}
        error={error}
        helperText={error}
        multiline={multiline}
        rows={rows}
        //   autoComplete="email"
        // margin="normal"
        InputProps={InputProps}
        onChange={onChange}
        variant={variant}
      />
    </div>
  );
};

export default Input;
