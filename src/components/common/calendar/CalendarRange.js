import React, { useState, useContext, useRef } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiPickersContext } from '@material-ui/pickers';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
// import { styles as dayStyles } from '@material-ui/core/styles/';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/moment';
import moment from 'moment';
import styled from 'styled-components';

import { palette, MEDIA_SCREENS } from '../../../theme';

function CalendarRange({ classes, value, onChange, dateTrips, ...props }) {
  // const [begin, setBegin] = useState(value[0]);
  // const [end, setEnd] = useState(value[1]);
  const [hover, setHover] = useState(undefined);
  const [selected, setSelected] = useState(0);
  // const picker = useRef();

  const begin = value[0];
  const end = value[1];

  const min = moment.min([moment(begin), moment(end) || moment(hover)]);
  const max = moment.max([moment(begin), moment(end) || moment(hover)]);

  function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
    const Day = () =>
      React.cloneElement(dayComponent, {
        onClick: e => {
          e.stopPropagation();

          if (!dateTrips.find(date => moment(date).isSame(day, 'day'))) return;

          if (selected == 0) {
            // setBegin(day);
            setSelected(selected + 1);
            onChange([day, day]);
          } else if (selected == 1) {
            // setEnd(day);
            onChange([begin, day].sort());
            setSelected(selected + 1);
          } else {
            // setBegin(day);
            // setEnd(day);
            onChange([day, day]);
            setSelected(0);
          }
        },
        onMouseEnter: e => setHover(day),
        className: clsx(classes.day, {
          [classes.hidden]: dayComponent.props.hidden,
          [classes.current]: dayComponent.props.current,
          [classes.isDisabled]: (() => {
            if (dateTrips && dateTrips.length > 0) {
              return !dateTrips.find(date => moment(date).isSame(day, 'day'));
            } else return dayComponent.props.disabled;
          })(),
          [classes.isTrip]: (() => {
            if (dateTrips && dateTrips.length > 0) {
              return dateTrips.find(date => moment(date).isSame(day, 'day'));
            } else return false;
          })(),
          [classes.isSelected]:
            moment(day).isSameOrAfter(moment(min), 'day') &&
            moment(day).isSameOrBefore(moment(max), 'day') &&
            dateTrips.find(date => moment(date).isSame(day, 'day')),
          // [classes.beginCap]: moment(day).isSame(moment(min), 'day'),
          // [classes.endCap]: moment(day).isSame(moment(max), 'day'),
        }),
      });

    return (
      <SelectedDay>
        <Day />
      </SelectedDay>
    );
  }

  return (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          {...props}
          variant="static"
          autoOk
          disableToolbar
          disablePast
          value={begin}
          renderDay={renderDay}
          onChange={() => {}}
          // ref={picker}
        />
      </MuiPickersUtilsProvider>
    </Wrapper>
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
    isTrip: {
      backgroundColor: '#009ada21',
      color: palette.primary.main,
      fontWeight: 'bold',
    },
    isSelected: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
    },
    day: {
      // ...base.day,
      // color: '#ffffff',
      // fontWeight: 500,
      // backgroundColor: '#343a40ed',
      // margin: 0,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '5%',
    },
    beginCap: {
      borderRadius: '50% 0 0 50%',
    },
    endCap: {
      borderRadius: '0 50% 50% 0',
    },
  };
};

export default withStyles(styles, { name: 'CalendarRange' })(CalendarRange);

const SelectedDay = styled.div`
  .MuiPickersDay-daySelected {
    color: #ffffff;
    font-weight: 500;
    background-color: #343a40ed;
  }
`;

const Wrapper = styled.div`
  // @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM + 'px'}) {
  //   height: 100vh;
  //   overflow-y: scroll;
  // }
  
  zoom: 2;
`;
