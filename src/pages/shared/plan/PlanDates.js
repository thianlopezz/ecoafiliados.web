import React, { useEffect, useState } from 'react';

import Container from '../../../components/common/wrappers/Container';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';
import Datepicker from '../../../components/common/inputs/Datepicker';
import moment from 'moment';
import ChooseDateItem from '../../../components/plan/ChooseDateItem';

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

const PlanDates = ({ actions, plan, logged, history, match }) => {
  const classes = useStyles();

  //efects
  useEffect(() => {
    if (match.params.idPlan) {
      actions.loadPlan(match.params.idPlan);
    } else {
      history.push('/404');
    }
  }, []);

  let [feIni, setFeIni] = useState(moment());
  let [feFin, setfeFin] = useState(moment());
  const [fechasFilter, setFechasFilter] = useState(undefined);

  function filter(fechas, feIni, feFin) {
    const dates = fechas.filter(item =>
      moment(item.fecha).isBetween(feIni, feFin)
    );
    setFechasFilter(dates);
  }

  const fechas = fechasFilter
    ? fechasFilter
    : plan.fechas
    ? plan.fechas.slice(0, 10)
    : [];

  const onFechaSelect = fecha => {
    // if (!logged) return showLoginModal();
    // setOpenChooseDate(false);
    // changeReserva({ cupos: 1 });
    // if (!fecha.idSalida) {
    //   let fechaAux = moment(fecha.fecha);
    //   saveSalida(
    //     {
    //       idPlan: plan.idPlan,
    //       fecha: fechaAux.toDate(),
    //       idDia: fechaAux.format('ddd').toUpperCase(),
    //     },
    //     idSalida => history.push(`/payment/${plan.idPlan}/${idSalida}`)
    //   );
    // } else {
    //   history.push(`/payment/${plan.idPlan}/${fecha.idSalida}`);
    // }
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {}}
            aria-label="close"
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="container p-4 h-100">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Container
              title="Search"
              description="Check avaiability between dates"
            >
              <Datepicker
                label="Choose day"
                name="feIni"
                variant="inline"
                value={feIni}
                onChange={value => {
                  setFeIni(value);
                  filter(plan.fechas, value, feFin);
                }}
                // error={errors.feNacimiento}
              />
              <Datepicker
                label="Choose day"
                name="tripDate"
                variant="feFin"
                value={feFin}
                onChange={value => {
                  setfeFin(value);
                  filter(plan.fechas, feIni, value);
                }}
                // error={errors.feNacimiento}
              />
            </Container>
          </div>

          <div className="col-sm-12 col-md-6">
            <Container
              title="Next available"
              description="Select dates to see availability."
            >
              {fechas.map(date => (
                <ChooseDateItem
                  key={moment(date.fecha).format('DDMMYYY')}
                  {...date}
                  onClickFecha={onFechaSelect}
                />
              ))}
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ planState, salidaState, loginState }, props) => {
  const { plan, loadingList } = planState;
  const { loading: loadingSalida } = salidaState;
  const { logged } = loginState;
  return {
    plan,
    loadingList,
    loadingSalida,
    logged,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadPlan: (idPlan, toPlanPage) =>
        dispatch({ type: 'PLAN_GET_BY_ID', idPlan, toPlanPage }),
      changeReserva: reserva => dispatch({ type: 'RESERVA_CHANGE', reserva }),
      saveSalida: (salida, onSuccess) =>
        dispatch({ type: 'SALIDA_SAVE', salida, onSuccess }),
      showLoginModal: () => dispatch({ type: 'SHOW_LOGIN_MODAL', show: true }),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanDates);
