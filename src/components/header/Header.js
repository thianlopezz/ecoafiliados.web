import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

// import { logoutAndRedirect } from "../../../actions/";

import { LOGOTIPO_LIGHT, DOTCOM } from '../../constants/index.js';
import HeaderList from './HeaderList';
import UserDropDown from './UserDropDown.js';
import AgencyDropDown from './AgencyDropDown';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '../common/inputs/Button.js';

const Header = ({ usuario, logged, openLeftSideBar, history }) => {
  const [connected, setConnectedValue] = useState(navigator.onLine);

  useEffect(() => {
    const setInternetStatus = () => {
      setConnectedValue(navigator.onLine);
    };

    window.addEventListener('online', setInternetStatus);
    window.addEventListener('offline', setInternetStatus);

    return () => {
      window.removeEventListener('online', setInternetStatus);
      window.removeEventListener('offline', setInternetStatus);
    };
  }, [setConnectedValue]);

  let agencia;

  if (usuario) {
    agencia = usuario.agencia;
  }

  const guestLinks = [
    { path: '/', text: 'Explore' },
    { path: '/login', text: 'Login / Sign up' },
  ];

  const travelerLinks = [
    { path: '/', text: 'Explore' },
    { path: '/trips', text: 'Trips' },
  ];

  let agencyLinks = [];

  if (agencia) {
    agencyLinks = [
      { path: '/dashboard', text: 'Dashboard' },
      { path: '/calendar', text: 'Calendario' },
      { path: '/plans', text: 'Planes' },
      {
        path: '/plan/create',
        text: 'Crea un nuevo plan',
      },
      { path: '/analytics', text: 'Analytics' },
      {
        path: '/agency/' + agencia.idPlanner || '',
        text: 'Perfil de agencia',
      },
    ];
  }
  return (
    <div>
      {/* Navbar web */}
      <nav
        id="navbar-main"
        className="ps-navbar-web navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
      >
        <div className="container-fluid py-2">
          {logged && (
            <IconButton
              aria-label="Back"
              color="primary"
              onClick={() => history.goBack()}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Open Menú"
            color="primary"
            onClick={openLeftSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard" className="navbar-brand mr-auto">
            <img src={LOGOTIPO_LIGHT} />
          </Link>
          <p>
            {connected ? 'Conectado a internet' : 'No hay conexión a internet'}
          </p>
        </div>
      </nav>

      {/* Navs Mobiles */}
      {/* <nav className="navbar ps-navbar-mob">

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-icon-only rounded-circle mt-2"
                        onClick={this.goBack.bind(this)}
                    >
                        <i className="fas fa-arrow-left" />
                    </button>

                    <img className="ps-img-nav" src={LOGOTIPO} />


                    {
                        carritoPlan.length ? (
                            <CarritoMenuContainerMob/>

                        ) : 
                        (
                            <div type="button"
                            className="mt-2">        
                        </div>

                        )
                    }
                </nav> */}

      <div className="ps-menu-movil">
        {/* <MobileNavList
            menus={this.props.menus}
            menuAction={this.menuAction}
            user={user}
          /> */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ loginState }) => {
  const { usuario, logged, menu } = loginState;

  return {
    usuario,
    logged,
    menu,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' }),
    openLeftSideBar: () => dispatch({ type: 'OPEN_LEFT_SIDEBAR' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
