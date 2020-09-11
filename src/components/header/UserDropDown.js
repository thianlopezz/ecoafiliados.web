import React from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '../common/Avatar';

import Avatar from '@material-ui/core/Avatar';
import UsuarioAvatar from '../usuario/UsuarioAvatar';

const UserDropDown = ({ usuario, onProfile, onSignOut }) => {
  return (
    <ul className="navbar-nav navbar-nav-hover m-2">
      <li className="nav-item dropdown mr-0">
        <Link
          // to={m.to ? m.to : '#'}
          // onClick={action}
          to="#"
          className="nav-link m-0 p-0"
          data-toggle="dropdown"
          href="#"
          role="button"
        >
          <UsuarioAvatar usuario={usuario} />
        </Link>
        <div className="dropdown-menu">
          <Link
            // onClick={() => onProfile(usuario.idUsuario)}
            to={'/profile/' + usuario.idUsuario}
            className="dropdown-item"
          >
            <UsuarioAvatar className="mx-auto" usuario={usuario} />
            <p className="mt-1 mb-1 text-center">{`${usuario.nombre} ${usuario.apellido}`}</p>
            <p className="mb-0 text-center text-muted">{usuario.correo}</p>
          </Link>
          <hr className="w-100" />
          <Link to="/account/settings" className="dropdown-item">
            Account
          </Link>
          <Link to="/" onClick={onSignOut} className="dropdown-item">
            Sign out
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default UserDropDown;
