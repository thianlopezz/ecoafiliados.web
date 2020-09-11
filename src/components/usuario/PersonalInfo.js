import React from 'react';
import moment from 'moment';

const genderOptions = [
  { value: 'M', text: 'Male' },
  { value: 'F', text: 'Female' },
  { value: 'O', text: 'Other' },
];

const PersonalInfo = ({ usuario }) => {
  let genero = genderOptions.find(genero => genero.value == usuario.genero);

  return (
    <div className="w-100">
      <h5>Nombre</h5>
      <p>{`${usuario.nombre} ${usuario.apellido}`}</p>
      <hr className="w-100 my-3"></hr>
      <h5>Correo personal</h5>
      <p>{usuario.correo}</p>
      <hr className="w-100 my-3"></hr>
      <h5>Contacto</h5>
      {usuario.contacto ? (
        <p>{usuario.contacto}</p>
      ) : (
        <p className="text-muted">No provisto</p>
      )}
      <hr className="w-100 my-3"></hr>
      <h5>Género</h5>
      {genero && genero.text ? (
        <p>{genero.text}</p>
      ) : (
        <p className="text-muted">No provisto</p>
      )}
      <hr className="w-100 my-3"></hr>
      <h5>Fecha de nacimiento</h5>
      {usuario.feNacimiento ? (
        <p>{moment(usuario.feNacimiento).format('MMM DD[,] YYYY')}</p>
      ) : (
        <p className="text-muted">No provisto</p>
      )}
    </div>
  );
};

export default PersonalInfo;
