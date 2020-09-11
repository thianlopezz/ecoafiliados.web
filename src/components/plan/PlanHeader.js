import React from 'react';
import PropTypes from 'prop-types';
import TitleDescription from '../common/TitleDescription';
import ImageFit from '../common/ImageFit';
import Button from '../common/inputs/Button';

const PlanHeader = ({
  plan,
  urlFoto,
  precio,
  tipoPlan,
  descripcion,
  ciudad,
  pais,
  duracion,
  cupos,
  incluidos,
  onSeeDates,
}) => {
  return (
    <div style={{ minHeight: '50vh' }} className="row">
      <div className="col-md-4 col-sm-12">
        <ImageFit image={urlFoto} />
      </div>
      <div className="col-md-8 col-sm-12">
        <h5 className="text-muted mb-0">{tipoPlan}</h5>
        <h1>{plan}</h1>
        <p className="text-muted">
          <a>
            {ciudad}, {pais}
          </a>
        </p>
        <div className="row">
          <div className="col-12">
            <div className="d-flex">
              <div className="p-2">
                <h3>${precio} per person</h3>
              </div>
              <div className="p-2">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSeeDates}
                >
                  See dates
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p>{descripcion}</p>
        <div className="row">
          <div className="col-3">
            <TitleDescription
              icon="fas fa-clock"
              title="Average time"
              description={`${duracion || ''}H`}
            />
          </div>
          <div className="col-3">
            <TitleDescription
              icon="fas fa-user-friends"
              title="Group size"
              description={cupos}
            />
          </div>
          <div className="col-3">
            <TitleDescription
              icon="fas fa-receipt"
              title="Includes"
              description={
                incluidos &&
                incluidos
                  .map(incluido => {
                    return incluido.incluido;
                  })
                  .join(', ')
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PlanHeader.propTypes = {
  plan: PropTypes.string,
  tipoPlan: PropTypes.string,
  descripcion: PropTypes.string,
  ciudad: PropTypes.string,
  duracion: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  cupos: PropTypes.number,
  incluye: PropTypes.string,
};

export default PlanHeader;
