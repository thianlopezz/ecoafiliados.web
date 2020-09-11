import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderListSubItem from './HeaderListSubItem';
// import MenuSubItem from './MenuSubItem';

const HeaderListItem = ({ menu, menuAction, user }) => {
  let m = menu;

  let action = null;

  if (menu.action) {
    action = menuAction[menu.action];
  } else {
    action = null;
  }

  let nombre;

  if (user && user.nombre) {
    nombre = user.nombre;
  } else if (user && user.displayName) {
    nombre = user.displayName;
  }

  return (
    <li className="nav-item dropdown">
      <Link
        to={m.to ? m.to : '#'}
        onClick={action}
        className={m.text == 'Usuario' ? 'nav-link m-0 p-0' : 'nav-link'}
        data-toggle={m.drops ? 'dropdown' : ''}
        href="#"
        role="button"
      >
        {m.text === 'Usuario' ? (
          <div className="pt-2 pb-1">
            {!user.foto ? (
              <button className="ml-2 btn btn-primary btn-icon-only rounded-circle">
                {nombre}
              </button>
            ) : (
              <img
                className="avatar avatar-sm "
                src={user.foto}
                alt={user.foto}
              />
            )}

            <span className="nav-link-inner--text">{nombre}</span>
          </div>
        ) : (
          <div>
            {' '}
            <i className={m.faw} />{' '}
            <span className="nav-link-inner-text">{m.text}</span>{' '}
          </div>
        )}
      </Link>
      {/* {m.drops && (
        <div className="dropdown-menu">
          {m.drops.menus.map(submenu => (
            <HeaderListSubItem
              key={submenu.text}
              submenu={submenu}
              menuAction={menuAction}
            />
          ))}
        </div>
      )} */}
      <div className="dropdown-menu">
        <Link
          onClick={() => {}}
          // to={submenu.to ? submenu.to : '#'}
          className="dropdown-item"
        >
          text
        </Link>
      </div>
    </li>
  );
};

HeaderListItem.propTypes = {
  menu: PropTypes.object.isRequired,
  menuAction: PropTypes.object.isRequired,
};

export default HeaderListItem;
