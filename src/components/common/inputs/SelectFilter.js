import React from 'react';
import { InputLabel, TextField, FormHelperText } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectFilter = ({
  label,
  name,
  value,
  variant,
  options = [],
  className,
  error,
  onChange,
  autoSelect,
  autoComplete,
  disableClearable,
  disabled,
}) => {
  let valueText = options.find(x => x.value == value);
  valueText = valueText ? valueText.text : '';

  return (
    <div className="form-group">
      {/* {label && <InputLabel htmlFor={name}>{label}</InputLabel>} */}
      <Autocomplete
        disabled={disabled}
        id={name}
        options={options}
        getOptionLabel={option => {
          if (isNaN(option)) {
            return option.text;
          } else {
            return valueText;
          }
        }}
        getOptionSelected={option => option.value == value}
        autoSelect={autoSelect}
        autoComplete={autoComplete}
        disableClearable={disableClearable}
        value={value}
        // inputValue={valueText}
        onChange={onChange}
        // style={{ width: 300 }}

        renderInput={params => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            fullWidth
            error={error}
          />
        )}
      />
      {/* <MSelect
        disabled={disabled}
        fullWidth
        variant={variant}
        value={value || ''}
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
      </MSelect> */}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

export default SelectFilter;
