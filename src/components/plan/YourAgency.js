import React from 'react';
import PropTypes from 'prop-types';
import TitleDescription from '../common/TitleDescription';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import Button from '../common/inputs/Button';

const YourAgency = ({ agencia, about, urlLogo, noPlanes, feCreacion }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Your Agency</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        <div className="row">
          <div className="col-3">
            <Avatar src={urlLogo} style={{ width: '120px', height: '120px' }} />
          </div>
          <div className="col-3">
            <TitleDescription
              title="Joined Nomadem"
              description={moment(feCreacion).format('YYYY')}
            />
          </div>
          <div className="col-3">
            <TitleDescription title="Plans ofered" description={noPlanes} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h3 className="mt-2 text-muted">{agencia}</h3>
          </div>
          <div className="col-12">
            <p>{about} </p>
          </div>
          <div className="col-12">
            <p>
              <Button variant="contained" color="primary">
                Contact
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

YourAgency.propTypes = {
  agencia: PropTypes.string,
  descripcion: PropTypes.string,
};

export default YourAgency;
