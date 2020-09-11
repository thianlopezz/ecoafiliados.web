import React from 'react';
import { Avatar } from '@material-ui/core';

const BrandInfo = ({ planner }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <Avatar
              src={planner.urlLogo}
              style={{ width: '140px', height: '140px' }}
              className="mx-auto"
            />
            <h4 className="text-center mt-2">{planner.agencia}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
