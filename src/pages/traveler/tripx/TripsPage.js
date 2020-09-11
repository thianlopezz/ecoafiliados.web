import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TripList from '../../../components/trip/TripList';
import TripDetailModal from '../../../components/trip/TripDetailModal';

const TripsPage = ({ loadingList, trips, usuario, loadTrips }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tripSelected, setTripSelected] = useState({});

  useEffect(() => {
    loadTrips(usuario.idUsuario);
  }, []);

  const onTripSelect = trip => {
    setTripSelected(trip);
    setModalOpen(true);
  };

  return (
    <div className="container-fluid2">
      <Section className="mt-4">
        <h1 className="mb-4">Your next plans</h1>
        <TripList
          loading={loadingList}
          trips={trips}
          onTripClick={onTripSelect}
        />
        {isModalOpen && (
          <TripDetailModal
            isOpen={isModalOpen}
            trip={tripSelected}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Section>
    </div>
  );
};

const mapStateToProps = ({ tripState, loginState }, props) => {
  const { trips, loadingList } = tripState;
  const { usuario } = loginState;
  return {
    trips,
    loadingList,
    usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTrips: idUsuario =>
      dispatch({ type: 'TRIP_GET_BY_USUARIO', idUsuario }),
  };
};

TripsPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsPage);
