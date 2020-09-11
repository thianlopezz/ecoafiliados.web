import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderSubListItem = ({ submenu, menuAction }) => {
  let action = menuAction[submenu.action];

  return (
    <Link
      onClick={action}
      to={submenu.to ? submenu.to : '#'}
      className="dropdown-item"
    >
      {submenu.text}
    </Link>

    // <li onClick={action}>
    //    <Link
    //        to={submenu.to ? submenu.to : '#'}
    //       aria-label="">
    //       <i className={submenu.faw}></i>
    //       {submenu.noti && <em className="roundpoint">10</em>}
    //       {submenu.text}
    //    </Link>

    //    {
    //    submenu.drops &&
    //    <ul className={submenu.drops.class}>
    //       {
    //          submenu.drops.menus.map(submenu =>
    //          <NavSubItem
    //          key={submenu.text}
    //          submenu={submenu}
    //          menuAction={menuAction}

    //          />)
    //       }
    //    </ul>
    //    }

    // </li>
  );
};

HeaderSubListItem.propTypes = {
  submenu: PropTypes.object.isRequired,
  menuAction: PropTypes.object.isRequired,
};

export default HeaderSubListItem;
