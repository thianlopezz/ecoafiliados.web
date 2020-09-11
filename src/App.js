import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/es';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/scss/bootstrap.scss';
import 'linearicons/dist/web-font/style.css';

import { compose } from 'redux';

import './sass/index.scss';
import { connect } from 'react-redux';
import Header from './components/header/Header';
import NotFountPage from './pages/shared/notFound/NotFoundPage';

import ReservationPage from './pages/planner/reservation/ReservationPage';

import LoginPage from './pages/shared/login/LoginPage';

import { createMuiTheme } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';

import SnackbarContentWrapper from './components/common/SnackbarContentWrapper';

import AccountSettingsPage from './pages/shared/account/AccountSettingsPage';

import AgencyPage from './pages/shared/profile/AgencyPage';
import PlanCreatePage from './pages/shared/plan/PlanCreatePage';

import LoginModal from './components/login/LoginModal';

import AgencyInfoPage from './pages/shared/account/AgencyInfoPage';
import LoginAndSecurityPage from './pages/shared/account/LoginAndSecurityPage';

import UserProvdier from './contexts/UserProvider';
import AppLayout from './components/common/Layouts/AppLayout';

import PersonalInfoPage from './pages/shared/account/PersonalInfoPage';
import ScrollTop from './components/common/ScrollTop';

import DashboardPage from './pages/planner/dashboard/DashboardPage';
import CalendarPage from './pages/planner/calendar/CalendarPage';
import ConfirmModal from './components/common/ConfirmModal';
import PlanesPage from './pages/planner/planes/PlanesPage';
import AnalyticsPage from './pages/planner/analytics/AnalyticsPage';
import { ApolloProvider } from '@apollo/react-hooks';
import { palette } from './theme';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { gqlproxy } from './helpers/proxyConfig';

moment.locale('es');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.primary.main,
      contrastText: palette.primary.contrastText,
    },
    secondary: {
      main: palette.secondary.main,
      contrastText: palette.secondary.contrastText,
    },
    danger: {
      main: palette.secondary.main,
      contrastText: palette.secondary.contrastText,
    },
  },
});

const client = new ApolloClient({
  link: createHttpLink({ uri: gqlproxy.url }),
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { usuario, logged, loadOrders, loadComercio } = this.props;

    if (logged) {
      loadOrders(usuario.idComercio);
      loadComercio(usuario.idComercio);
    }
  }

  render() {
    const { usuario, logged, open, time, mensaje, variant, close } = this.props;

    let publicRoutes = [
      {
        path: '/',
        component: LoginPage,
      },
      {
        path: '/login',
        component: LoginPage,
      },
    ];

    const plannerRoutes = [
      {
        path: '/plan/create/:idPlan?',
        component: PlanCreatePage,
      },
      {
        path: '/account/agency-info',
        component: AgencyInfoPage,
      },
      {
        path: '/dashboard',
        component: DashboardPage,
      },
      {
        path: '/calendar',
        component: CalendarPage,
      },
      {
        path: '/plans',
        component: PlanesPage,
      },
      ,
      {
        path: '/agency/:idPlanner',
        component: AgencyPage,
      },
      {
        path: '/account/settings',
        component: AccountSettingsPage,
      },
      {
        path: '/account/personal-info',
        component: PersonalInfoPage,
      },
      {
        path: '/account/login-security',
        component: LoginAndSecurityPage,
      },
      {
        path: '/reservation/:idTrip',
        component: ReservationPage,
      },

      {
        path: '/analytics',
        component: AnalyticsPage,
      },
    ];

    return (
      <ApolloProvider client={client}>
        <UserProvdier>
          <Router history={this.props.history}>
            <ScrollTop>
              <AppLayout
                // style={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   height: '100vh',
                // }}
                history={this.props.history}
              >
                <Header {...this.props} />
                <div style={{ flex: '1 0 auto' }}>
                  {/* <div className="container-fluid2">
                    <Button
                      startIcon={<ArrowBackIosIcon fontSize="inherit" />}
                      color="primary"
                      className="ml-auto"
                      onClick={() => this.props.history.goBack()}
                    >
                      Regresar
                    </Button>
                  </div> */}
                  <Switch>
                    {logged &&
                      usuario.idComercio &&
                      plannerRoutes.map((route, index) => (
                        <Route key={index} exact {...route} />
                      ))}
                    {publicRoutes.map((route, index) => (
                      <Route key={index} exact {...route} />
                    ))}
                    <Route path="/404" component={NotFountPage} />
                    <Route component={NotFountPage} />
                  </Switch>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={time || 4000}
                    variant={variant}
                    onClose={close}
                    onExited={close}
                  >
                    <SnackbarContentWrapper
                      onClose={close}
                      variant={variant || 'info'}
                      message={mensaje}
                    />
                  </Snackbar>
                  <LoginModal history={this.props.history} />
                  <ConfirmModal />
                  <LeftSideBar history={this.props.history} />
                </div>

                {/* <Footer /> */}
              </AppLayout>
            </ScrollTop>
          </Router>
        </UserProvdier>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = ({ loginState, snackbarState }) => {
  const { usuario, logged } = loginState;

  const { open, time, mensaje, variant } = snackbarState;
  return {
    usuario,
    logged,
    open,
    time,
    mensaje,
    variant,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: idComercio => dispatch({ type: 'ORDERS_GET', idComercio }),
    loadComercio: idComercio =>
      dispatch({ type: 'COMERCIO_GET_BY_ID', idComercio }),
    close: () => dispatch({ type: 'CLOSE_SNACKBAR', open: false }),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
// export default compose(
//     withRouter,
//     connect(
//         mapStateToProps,
//         null
//     )
// )(App);
