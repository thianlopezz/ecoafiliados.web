import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlanHeader from '../../../components/plan/PlanHeader';
import Section from '../../../components/common/wrappers/Section';
import WhatsInclude from '../../../components/plan/WhatsInclude';
import YourAgency from '../../../components/plan/YourAgency';
import TravelerReviews from '../../../components/plan/TravelerReviews';
import Availability from '../../../components/plan/Availability';
import WhatsYoullDo from '../../../components/plan/WhatYoullDo';
import WhereYoullBe from '../../../components/plan/WhereYoullBe';
import GuestPhotos from '../../../components/plan/GuestPhotos';
import WhereWeStart from '../../../components/plan/WhereWeStart';
import ChooseDateModal from '../../../components/plan/ChooseDateModal';
import moment from 'moment';
import Container from '../../../components/common/wrappers/Container';

const PlanPage = ({
  loadingList,
  history,
  match,
  plan,
  loadPlan,
  changeReserva,
  saveSalida,
  loadingSalida,
  logged,
  showLoginModal,
}) => {
  const [isOpenChooseDate, setOpenChooseDate] = useState(false);

  useEffect(() => {
    if (+match.params.idPlan) {
      loadPlan(match.params.idPlan);
    } else {
      history.push('/404');
    }
  }, []);

  const onFechaSelect = fecha => {
    if (!logged) return showLoginModal();
    setOpenChooseDate(false);
    changeReserva({ cupos: 1 });
    history.push(`/payment/${plan.idPlan}/${fecha.idSalida}`);
  };

  return (
    <Container>
      <Section className="mt-4">
        <PlanHeader
          {...plan}
          onSeeDates={() => {
            setOpenChooseDate(true);
          }}
        />
      </Section>
      {plan.incluidos && (
        <Section>
          <WhatsInclude incluidos={plan.incluidos} />
        </Section>
      )}
      {plan.lugares && (
        <Section>
          <WhereYoullBe lugares={plan.lugares} />
        </Section>
      )}
      {plan.actividades && (
        <Section>
          <WhatsYoullDo actividades={plan.actividades} />
        </Section>
      )}
      {plan.planner && (
        <Section>
          <YourAgency {...plan.planner} />
        </Section>
      )}
      <Section>
        <GuestPhotos />
      </Section>
      <Section>
        <TravelerReviews
          stars={5}
          reviews={[
            {
              image:
                'https://miro.medium.com/fit/c/256/256/1*85AoiyLeFdu9Qqhr4niO3Q.jpeg',
              nombre: 'Thian Lopez',
              stars: 4.5,
              fecha: '23 Ago, 2019',
              comentario:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            },
          ]}
        />
      </Section>
      {plan.planner && (
        <Section>
          <WhereWeStart
            latitud={plan.planner.latitud}
            longitud={plan.planner.longitud}
          />
        </Section>
      )}
      {plan.trips && plan.trips.length > 0 && (
        <Section>
          <Availability
            precio={plan.precio}
            nextDate={plan.trips[0]}
            onChooseDate={() => setOpenChooseDate(true)}
            onClickFecha={onFechaSelect}
          />
        </Section>
      )}
      {!loadingList && plan.trips && (
        <ChooseDateModal
          isOpen={isOpenChooseDate}
          loading={loadingSalida}
          onCloseModal={() => setOpenChooseDate(false)}
          trips={[...plan.trips]}
          onClickFecha={onFechaSelect}
        />
      )}
    </Container>
  );
};

const mapStateToProps = ({ planState, salidaState, loginState }, props) => {
  const { plan, loadingList } = planState;
  const { loading: loadingSalida } = salidaState;
  const { logged } = loginState;
  return { plan, loadingList, loadingSalida, logged };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPlan: (idPlan, toPlanPage) =>
      dispatch({ type: 'PLAN_GET_BY_ID', idPlan, toPlanPage }),
    changeReserva: reserva => dispatch({ type: 'RESERVA_CHANGE', reserva }),
    saveSalida: (salida, onSuccess) =>
      dispatch({ type: 'SALIDA_SAVE', salida, onSuccess }),
    showLoginModal: () => dispatch({ type: 'SHOW_LOGIN_MODAL', show: true }),
  };
};

PlanPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanPage);
