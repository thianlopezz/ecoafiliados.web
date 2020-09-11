import React from 'react';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { FormHelperText } from '@material-ui/core';

const Datepicker = ({
  label,
  name,
  value,
  format,
  disablePast,
  disableToolbar,
  error,
  variant,
  onChange,
  className,
}) => {
  return (
    <div className="form-group" className={className}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          disablePast
          disableToolbar={disableToolbar}
          variant={variant}
          format={format || 'YYYY-MM-DD'}
          id={name}
          label={label}
          value={value}
          error={error}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Datepicker;
