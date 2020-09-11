import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const UsuarioAvatar = ({ usuario, className, size = '50px' }) => {
  return usuario.foto ? (
    <Avatar
      src={usuario.foto}
      className={className}
      style={{ width: size, height: size }}
    />
  ) : (
    <Avatar
      className={className}
      style={{ width: size, height: size }}
    >{`${usuario.nombre[0].toUpperCase() +
      ' ' +
      usuario.apellido[0].toUpperCase()}`}</Avatar>
  );
};

export default UsuarioAvatar;
