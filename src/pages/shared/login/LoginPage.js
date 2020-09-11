import React from 'react';
import LoginRegistroForm from '../../../components/login/LoginRegistroForm';
import { makeStyles, Card, CardContent } from '@material-ui/core';

import { palette, CSS_HELPERS_REACT } from '../../../theme';
import { LOGOTIPO_LIGHT } from '../../../constants';

const LoginPage = ({ history }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="container"
    >
      <div className="row mt-4">
        <div className="col-sm-12 text-center mb-4 d-flex">
          <div className="bg-dark rounded-circle m-auto">
            <img width="150" className="px-2 py-4" src={LOGOTIPO_LIGHT}></img>
          </div>
        </div>
        <h5 className="col-12 text-center my-2">Afiliados</h5>
        <div className="col-sm-12">
          <Card className={classes.card}>
            <CardContent>
              <LoginRegistroForm history={history} />
            </CardContent>
          </Card>
          <p className="text-center">V. 0.3.2</p>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    ...CSS_HELPERS_REACT.BOX_SHADOW,
    borderRadius: '.6em',
  },
  floatRight: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: '2em',
  },
}));

export default LoginPage;
