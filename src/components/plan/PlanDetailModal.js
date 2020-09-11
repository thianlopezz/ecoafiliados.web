import React, { useState } from 'react';
import FullModal from '../common/modals/FullModal';
import MapContainer from '../common/MapContainer';
import moment from 'moment';
import ImageCard from '../common/cards/ImageCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MEDIA_SCREENS } from '../../theme';
import Calendar from '../common/calendar/Calendar';
import Section from '../common/wrappers/Section';
import ChooseDateItem from './ChooseDateItem';
import Button from '../common/inputs/Button';

export default function PlanDetailModal({ isOpen, plan, onClose }) {
  const [selectedDate, setSelectedDate] = useState(moment());

  const {
    idPlan,
    feSalida,
    urlFoto,
    plan: planDescription,
    ciudad,
    descripcion,
    latitud,
    longitud,
    horaInicio,
    horaSalida,
  } = plan;

  let fechasViajes = plan.fechas
    ? plan.fechas.map(fecha => moment(fecha.fecha))
    : [];

  let viajes = plan.fechas
    ? plan.fechas.filter(fecha =>
        moment(fecha.fecha).isSame(selectedDate, 'day')
      )
    : [];

  return (
    <FullModal isOpen={isOpen} onClose={onClose}>
      <div className="row p-0 m-0">
        <Detalle className="col-sm-12 col-md-3 mt-4">
          <ImageCard
            onClick={() => window.open('/plan/' + idPlan, '_newtab')}
            image={urlFoto}
            title={planDescription}
            subtitle={ciudad}
            description={descripcion}
          />
          {/* <hr></hr>
          <p>
            <Link>Contact agency</Link>
          </p> */}
        </Detalle>
        <div className="col-sm-12 col-md-9 p-0 m-0" style={{ height: '100vh' }}>
          <div className="container page mt-4">
            <Section>
              <h1>Próximas fechas</h1>
              <p>
                Estas son las próximas fechas que tienes previsto realizar este
                viaje
              </p>
              <div className="row">
                <div className="col">
                  <Calendar
                    datesChecked={fechasViajes}
                    format={'DD-MM-YYYY'}
                    onChange={date => setSelectedDate(moment(date))}
                  ></Calendar>
                </div>
                <div className="col">
                  <div className="row p-0 m-0">
                    {viajes.length > 0 ? (
                      viajes.map(date => (
                        <div className="col-12 p-0 m-0">
                          <ChooseDateItem
                            key={moment(date.fecha).format('DDMMYYY')}
                            {...date}
                            // onClickFecha={onClickFecha}
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <h3 className="mb-1">
                          {moment(selectedDate).format('ddd[,] DD MMM YYYY')}
                        </h3>
                        <hr className="w-100"></hr>
                        <p>No tienes viajes planificados para este día.</p>
                        <hr className="w-100"></hr>
                      </>
                    )}
                    <div className="col-12 p-0 m-0">
                      <Button className="btn btn-block">
                        Crear un nuevo viaje
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </FullModal>
  );
}

const Detalle = styled.div`
  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM + 'px'}) {
    height: 100vh;
    overflow-y: scroll;
  }
`;
