import React from 'react';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import { FormHelperText } from '@material-ui/core';

const Timepicker = ({
  label,
  name,
  value,
  error,
  variant,
  inputVariant,
  onChange,
}) => {
  return (
    <div className="form-group mb-0">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          variant={variant}
          inputVariant={inputVariant}
          id={name}
          label={label}
          value={value}
          onChange={onChange}
          inpu
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

export default Timepicker;
