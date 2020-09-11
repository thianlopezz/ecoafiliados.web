import React from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '../common/Avatar';

import Avatar from '@material-ui/core/Avatar';

const AgencyDropDown = ({ text, links }) => {
  return (
    <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
      <li className="nav-item dropdown">
        <Link
          to={'#'}
          // onClick={action}
          className="nav-link"
          data-toggle="dropdown"
          href="#"
          role="button"
        >
          {text}
        </Link>
        <div className="dropdown-menu">
          <div className="text-muted my-2 mx-3">Manage agency</div>
          {links.map(link => (
            <Link
              key={link.text}
              to={link.path}
              // to={submenu.to ? submenu.to : '#'}
              className="dropdown-item"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </li>
    </ul>
  );
};

export default AgencyDropDown;
