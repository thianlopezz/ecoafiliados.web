import React, { useState, useContext, useRef } from 'react';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
// import { styles as dayStyles } from '@material-ui/core/styles/';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/moment';
import moment from 'moment';

import { palette, MEDIA_SCREENS } from '../../../theme';

function DateRangePicker({
  classes,
  label,
  value,
  onChange,
  autoOk,
  ...props
}) {
  //   const [begin, setBegin] = useState(value[0]);
  //   const [end, setEnd] = useState(value[1]);
  const [selected, setSelected] = useState(0);
  const [hover, setHover] = useState(undefined);
  const picker = useRef();

  const begin = value[0];
  const end = value[1];

  const min = moment.min([moment(begin), moment(end) || moment(hover)]);
  const max = moment.max([moment(begin), moment(end) || moment(hover)]);

  function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
    const Day = () =>
      React.cloneElement(dayComponent, {
        onClick: e => {
          e.stopPropagation();

          console.log(selected);
          if (selected == 0) {
            // setBegin(day);
            setSelected(selected + 1);
            onChange([day, day]);
          } else if (selected == 1) {
            // setEnd(day);
            setSelected(selected + 1);
            onChange(
              [moment(begin).toDate(), moment(day).toDate()].sort(
                (a, b) => new Date(a) - new Date(b)
              )
            );
          } else {
            // setBegin(day);
            // setEnd(day);
            setSelected(1);
            onChange([day, day]);
          }
        },
        onMouseEnter: e => setHover(day),
        className: clsx(classes.day, {
          [classes.hidden]: dayComponent.props.hidden,
          [classes.current]: dayComponent.props.current,
          [classes.isSelected]:
            moment(day).isSameOrAfter(moment(min), 'day') &&
            moment(day).isSameOrBefore(moment(max), 'day'),
          [classes.beginCap]: moment(day).isSame(moment(min), 'day'),
          [classes.endCap]: moment(day).isSame(moment(max), 'day'),
        }),
      });

    return <Day />;
  }

  return (
    <div className="form-group">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          //   {...props}
          fullWidth
          label={label}
          //   orientation="landscape"
          //   variant="inline"
          autoOk={autoOk}
          value={begin}
          renderDay={renderDay}
          onChange={() => {}}
          ref={picker}
          labelFunc={(date, invalid) =>
            date && begin && end
              ? `${moment(begin).format('DD[/]MM[/]YYYY')} - ${moment(
                  end
                ).format('DD[/]MM[/]YYYY')}`
              : 'Selecciona un rango'
          }
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export const styles = theme => {
  // const base = makeStyles(theme);
  // const base = useTheme();
  return {
    // ...base,
    isDisabled: {
      textDecoration: 'line-through',
      opacity: 0.7,
      '&:hover': {
        cursor: 'unset',
        background: 'rgba(0,0,0,0)',
      },
    },
    isSelected: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
    },
    day: {
      // ...base.day,
      margin: 0,
      width: '40px',
      borderRadius: '0',
      //   width: '36px',
      height: '36px',
      //   margin: '0 2px',
      padding: '0',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
    beginCap: {
      borderRadius: '50% 0 0 50%',
    },
    endCap: {
      borderRadius: '0 50% 50% 0',
    },
  };
};

export default withStyles(styles, { name: 'DateRangePicker' })(DateRangePicker);
