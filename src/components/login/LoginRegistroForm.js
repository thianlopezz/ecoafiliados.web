import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginForm from './LoginForm';
import RegistroForm from './RegistroForm';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

const LoginRegistroForm = ({
  history,
  loginLoading,
  login,
  registro,
  loadOrders,
  loadComercio,
}) => {
  let [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const navigateToDashboardAndLoadData = idComercio => {
    loadOrders(idComercio);
    loadComercio(idComercio);
    history.replace('/dashboard');
  };

  const _login = userPass => {
    login(
      { ...userPass },
      history.location.pathname.indexOf('login') !== 0
        ? navigateToDashboardAndLoadData
        : null
    );
  };

  const navigateToSuccess = () => {
    // history.replace('/register/success');
    window.location = '/register/success';
  };

  const _registro = _registro => {
    registro({ ..._registro }, navigateToSuccess);
  };

  return <LoginForm onSubmit={_login} loading={loginLoading} />;
};

const mapStateToProps = ({ loginState, registroState }, props) => {
  const { loading: loginLoading, usuario, logged } = loginState;
  const { loading: registroLoading } = registroState;

  return {
    loginLoading,
    registroLoading,
    usuario,
    logged,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (login, onSuccess) => dispatch({ type: 'LOGIN', login, onSuccess }),
    registro: (registro, navigate) =>
      dispatch({ type: 'REGISTRO', registro, navigate }),
    loadOrders: idComercio => dispatch({ type: 'ORDERS_GET', idComercio }),
    loadComercio: idComercio =>
      dispatch({ type: 'COMERCIO_GET_BY_ID', idComercio }),
  };
};

LoginRegistroForm.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegistroForm);
