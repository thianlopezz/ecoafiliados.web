import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Section from '../../../components/common/wrappers/Section';
import PassengerPaymentForm from '../../../components/reviewAndPay/PassengerPaymentForm';
import PlanInfoCard from '../../../components/reviewAndPay/PlanInfoCard';

const PayAndReviewPage = ({
  history,
  loading,
  plan,
  trip,
  reserva,
  usuario,
  changeReserva,
  match,
  loadSalidaPlan,
  saveCompra,
}) => {
  let numberOptions = [];

  let left;
  if (trip.ocupados !== undefined && plan.cupos) {
    left = plan.cupos - trip.ocupados;
    for (let i = 0; i < left; i++) {
      numberOptions.push({ text: i + 1, value: i + 1 });
    }
  }

  useEffect(() => {
    loadSalidaPlan(match.params.idSalida, match.params.idPlan);
    changeReserva({
      cupos: 1,
      pasajeros: [
        {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
        },
      ],
    });
  }, []);

  return (
    <div className="container page">
      <Section>
        <div className="row mt-4">
          <div className="col-md-7 col-sm-12">
            <PassengerPaymentForm
              title="Review and pay"
              description="You can add more friends to this experience and confirm your
                  reservation."
              loading={loading}
              reserva={reserva}
              usuario={usuario}
              numberOptions={numberOptions}
              onReservaChange={changeReserva}
              onSubmit={reserva => {
                if (!reserva.pasajeros) reserva.pasajeros = [];
                saveCompra(
                  {
                    ...reserva,
                    idSalida: trip.idSalida,
                    idPlan: plan.idPlan,
                    idUsuario: usuario.idUsuario,
                    valorUnitario: plan.precio,
                    tipoCompra: 'SELF',
                  },
                  () => history.push('/trips')
                );
              }}
            />
          </div>
          <div className="col-md-5 col-sm-12">
            <PlanInfoCard plan={plan} reserva={reserva} salida={trip} />
          </div>
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = (
  { reservaState, planState, loginState, tripState },
  props
) => {
  const { loading, reserva } = reservaState;
  const { trip } = tripState;
  const { plan } = planState;
  const { usuario } = loginState;
  return { loading, plan, reserva, usuario, trip };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSalidaPlan: (idSalida, idPlan) =>
      dispatch({ type: 'TRIP_PLAN_GET', idSalida, idPlan }),
    changeReserva: reserva => dispatch({ type: 'RESERVA_CHANGE', reserva }),
    saveCompra: (reserva, onSuccess) =>
      dispatch({ type: 'RESERVA_SAVE', reserva, onSuccess }),
  };
};

PayAndReviewPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayAndReviewPage);
