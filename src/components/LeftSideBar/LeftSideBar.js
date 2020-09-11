import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UsuarioAvatar from '../usuario/UsuarioAvatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { ListItemAvatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const LeftSideBar = ({
  history,
  usuario,
  logout,
  isLeftSideBarOpen,
  openLeftSideBar,
  closeLeftSideBar,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let isComercio;

  if (usuario) {
    isComercio = usuario.idComercio;
  }

  let linksToShow = [];

  if (isComercio) {
    linksToShow = [
      { path: '/dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
      // { path: '/calendar', text: 'Calendario', icon: <EventIcon /> },
      // { path: '/plans', text: 'Planes', icon: <ListAltIcon /> },
      // {
      //   path: '/plan/create',
      //   text: 'Crea un nuevo plan',
      //   icon: <PlaylistAddIcon />,
      // },
      // { path: '/analytics', text: 'Analytics', icon: <TimelineIcon /> },
      // {
      //   path: '/agency/' + isComercio.idPlanner || '',
      //   text: 'Perfil de agencia',
      //   icon: <ExploreIcon />,
      // },
    ];
  } else {
    linksToShow = [{ path: '/login', text: 'Login', icon: <LockOpenIcon /> }];
  }

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    open ? openLeftSideBar() : closeLeftSideBar();
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {usuario && (
          <ListItem className="my-4">
            <ListItemAvatar className="mx-auto">
              <UsuarioAvatar usuario={usuario} />
            </ListItemAvatar>
          </ListItem>
        )}
        {usuario && (
          <ListItem className="my-4">
            <ListItemText
              // title={usuario.nombre + ' ' + usuario.apellido}
              primary={
                <h5 className="text-center">
                  {usuario.nombre + ' ' + usuario.apellido}
                </h5>
              }
            />
            {/* <p>{usuario.nombre + ' ' + usuario.apellido}</p> */}
          </ListItem>
        )}
        {linksToShow.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            style={{ color: 'unset', textDecoration: 'unset' }}
          >
            <ListItem button key={link.path}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {usuario && (
        <>
          <List>
            <Link
              to="/account/settings"
              style={{ color: 'unset', textDecoration: 'unset' }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Cuenta" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                history.replace('/login');
                logout();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <Drawer open={isLeftSideBarOpen} onClose={closeLeftSideBar}>
      {sideList()}
    </Drawer>
  );
};

const mapStateToProps = ({ loginState, sideBarState }) => {
  const { usuario, logged, menu } = loginState;
  const { isLeftSideBarOpen } = sideBarState;

  return {
    usuario,
    isLeftSideBarOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' }),
    openLeftSideBar: () => dispatch({ type: 'OPEN_LEFT_SIDEBAR' }),
    closeLeftSideBar: () => dispatch({ type: 'CLOSE_LEFT_SIDEBAR' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
