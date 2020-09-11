import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import Container from '../../../components/common/wrappers/Container';
import PassengerPaymentForm from '../../../components/reviewAndPay/PassengerPaymentForm';
import AsideGrid from '../../../components/common/wrappers/AsideGrid';
import PlanInfoCard from '../../../components/reviewAndPay/PlanInfoCard';

const generateNumberOptions = trip => {
  let numberOptions = [];
  const tripsLeft = trip.cupos - trip.ocupados;
  for (let i = 0; i < tripsLeft; i++) {
    numberOptions.push({ text: i + 1, value: i + 1 });
  }

  return numberOptions;
};

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

const ReviewPay = ({
  //
  history,
  open,
  onClose,
  trip,
  //rx
  reservaState,
  planState,
  login,
  //rx
  reservaChange,
  // loadTrip,
  booking,
  loadPaises,
  paisesOption,
  onDelete,
}) => {
  useEffect(() => {
    // loadTrip(idTrip, idPlan);
    reservaChange({ cupos: 1, pasajeros: [{}] });
    loadPaises();
  }, []);

  const classes = useStyles();

  let options = generateNumberOptions(trip);

  const hasToShowPriceInput = () => {
    if (reservaState.reserva.idCompra) {
      return false;
    } else if (reservaState.reserva.total == undefined) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <AsideGrid
          web={{ left: 9, right: 3 }}
          mob={{ left: 1, right: 1, direction: 'column-reverse' }}
        >
          <PassengerPaymentForm
            // formErrors={reservaState.error || null}
            title="Nueva reserva"
            loading={reservaState.loading}
            reserva={reservaState.reserva}
            numberOptions={options}
            onReservaChange={reservaChange}
            paisesOption={paisesOption}
            isAgency
            onSubmit={reserva => {
              if (!reserva.pasajeros) reserva.pasajeros = [];
              booking(
                {
                  ...reserva,
                  idSalida: trip.idSalida,
                  idPlan: trip.idPlan,
                  idUsuario: login.usuario.idUsuario,
                  valorUnitario: trip.precio,
                  tipoCompra: 'AGCY',
                },
                () => {
                  // loadTrip(idTrip, idPlan);
                  reservaChange({ cupos: 1, pasajeros: [{}] });
                  onClose();
                }
              );
            }}
            onDelete={onDelete}
          ></PassengerPaymentForm>

          <PlanInfoCard
            plan={trip.planDetalle}
            reserva={reservaState.reserva}
            total={reservaState.reserva.total}
            onChangePrecio={total =>
              reservaChange({ ...reservaState.reserva, total })
            }
            showTotalInput={hasToShowPriceInput()}
            salida={trip}
          />
        </AsideGrid>
      </Container>
    </Dialog>
  );
};

const mapStateToProps = ({
  reservaState,
  loginState,
  // tripState,
  paisState,
}) => {
  const { paises } = paisState;
  let paisesOption = paises.map(pais => {
    return { value: pais.idPais, text: pais.pais };
  });

  return {
    reservaState,
    login: loginState,
    paisesOption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loadTrip: (idSalida, idPlan) =>
    //   dispatch({ type: 'TRIP_PLAN_GET', idSalida, idPlan }),
    reservaChange: reserva => dispatch({ type: 'RESERVA_CHANGE', reserva }),
    booking: (reserva, onSuccess) =>
      dispatch({ type: 'RESERVA_SAVE', reserva, onSuccess }),
    loadPaises: () => dispatch({ type: 'PAISES_GET' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPay);
