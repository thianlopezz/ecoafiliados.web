import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

import MSelect from '@material-ui/core/Select';

const Select = ({
  label,
  name,
  value,
  variant,
  options = [],
  className,
  error,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group">
      {label && <InputLabel htmlFor="age-simple">{label}</InputLabel>}
      <MSelect
        disabled={disabled}
        fullWidth
        variant={variant}
        value={value != undefined ? value : ''}
        className={className}
        onChange={onChange}
        inputProps={{
          name,
          id: name,
        }}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </MSelect>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

export default Select;
