import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Datepicker from '../common/inputs/Datepicker';
import moment from 'moment';
import ChooseDateItem from './ChooseDateItem';
import Calendar from '../common/calendar/Calendar';
import Section from '../common/wrappers/Section';
import CalendarRange from '../common/calendar/CalendarRange';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    // background: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChooseDateModal({
  trips = [],
  isOpen,
  onClickFecha,
  onCloseModal,
}) {
  const classes = useStyles();
  let [feIni, setFeIni] = useState(undefined);
  let [feFin, setFeFin] = useState(undefined);
  let [tripsFilter, setTripsFilter] = useState(trips.slice(0, 10));

  const handleClose = () => {
    onCloseModal();
  };

  const filter = (feIni, feFin) => {
    tripsFilter = trips.filter(trip =>
      moment(trip.feSalida).isBetween(
        moment(feIni),
        moment(feFin || moment(feIni)),
        'day',
        '[]'
      )
    );
    setTripsFilter(tripsFilter);
  };

  let dateTrips = trips.map(fecha => moment(fecha.feSalida));
  // let tripsFilter = filterTripsByDate(trips, selectedDate);

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="container-fluid2">
          <Section className="mt-4">
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <CalendarRange
                  value={[feIni, feFin]}
                  onChange={value => {
                    setFeIni(value[0]);
                    setFeFin(value[1]);
                    filter(value[0], value[1]);
                  }}
                  dateTrips={dateTrips}
                />
                <p>Choose the range dates between your trip.</p>
              </div>
              <div className="col-sm-12 col-md-5 col-lg-4">
                {!feIni ? (
                  <>
                    <h2>Next available</h2>
                    <p>Select dates to see availability.</p>
                  </>
                ) : (
                  <>
                    <h2>{tripsFilter.length} times avalible</h2>
                    <div className="d-flex">
                      <p>Select dates to see availability.</p>
                      <Link
                        className="ml-auto my-auto"
                        to="#"
                        onClick={() => {
                          setFeIni(undefined);
                          setFeFin(undefined);
                          setTripsFilter(trips.slice(0, 10));
                        }}
                      >
                        Clear dates
                      </Link>
                    </div>
                  </>
                )}
                {tripsFilter.length == 0 && (
                  <>
                    <hr className="w-100"></hr>
                    <div className="row">
                      <div className="col">
                        <p className="text-center">No dates available</p>
                      </div>
                    </div>
                    <hr className="w-100"></hr>
                  </>
                )}
                {tripsFilter.map(trip => (
                  <ChooseDateItem
                    key={moment(trip.feSalida).format('DDMMYYY')}
                    {...trip}
                    onClickFecha={onClickFecha}
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </Dialog>
    </div>
  );
}
