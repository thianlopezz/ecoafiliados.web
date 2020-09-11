import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import HeaderListItem from './HeaderListItem';
import Avatar from '../common/Avatar';

const HeaderList = ({ menus, menuAction, user }) => {
  return (
    <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
      {menus.map(menu => (
        <HeaderListItem key={menu.text} menu={menu} user={user} />
      ))}
    </ul>
  );
};

HeaderList.propTypes = {
  menues: PropTypes.array,
  menuAction: PropTypes.object.isRequired,
};

export default HeaderList;
