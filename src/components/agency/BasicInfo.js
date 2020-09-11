import React from 'react';

const BasicInfo = ({ planner }) => {
  return (
    <div className="w-100">
      <h5>Nombre de agencia</h5>
      <p>{planner.agencia}</p>
      <hr className="w-100 my-3"></hr>
      <h5>Acerca de la agencia</h5>
      <p>{planner.about}</p>
      <hr className="w-100 my-3"></hr>
      <div className="row form-group">
        <div className="col-md-6 col-sm-12">
          <h5>Correo</h5>
          <p>{planner.correo}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <h5>Contacto</h5>
          <p>{planner.contacto}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
