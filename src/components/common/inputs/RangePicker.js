import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { now } from 'moment';
import RangePickerHeader from './RangePickerHeader';

import moment from 'moment';

export default function RangePicker(props) {
  const [selectedDate, setSelectedDate] = useState(now);
  const [initialDate, setInitialDate] = useState(undefined);
  const [finalDate, setFinalDate] = useState(undefined);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const hanldeFirst = date => {
    setSelectedDate(null);
    setInitialDate(date);

    setOpen(1);
    setStep(2);
  };

  const hanldeSecond = date => {
    setSelectedDate(date);
    setFinalDate(date);
    setOpen(0);
    setStep(1);

    props.handleChange({
      fechaIni: initialDate,
      fechaFin: finalDate,
    });
  };

  const handleBack = () => {
    setOpen(1);
    setStep(1);
  };

  const handleClose = () => {
    setOpen(0);
    setStep(1);
  };

  const Toolbar = RangePickerHeader;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {step == 1 && (
        <KeyboardDatePicker
          ToolbarComponent={() => (
            <Toolbar title="Fecha desde" handleClose={handleClose} />
          )}
          onOpen={() => setOpen(true)}
          open={open && step == 1}
          autoOk
          disableFuture
          margin="normal"
          label="Desde"
          format="MM/dd/yyyy"
          value={initialDate ? initialDate : selectedDate}
          onChange={hanldeFirst}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      )}

      {step == 2 && (
        <KeyboardDatePicker
          autoOk
          ToolbarComponent={() => (
            <Toolbar
              title="Fecha hasta"
              handleClose={handleClose}
              handleBack={handleBack}
            />
          )}
          open={open && step == 2}
          margin="normal"
          label="Hasta"
          format="MM/dd/yyyy"
          initialFocusedDate={initialDate}
          value={finalDate ? finalDate : initialDate}
          onChange={hanldeSecond}
          // disablePast
        />
      )}
    </MuiPickersUtilsProvider>
  );
}
