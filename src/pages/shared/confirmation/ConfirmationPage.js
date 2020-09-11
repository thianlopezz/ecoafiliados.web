import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import Button from '../../../components/common/inputs/Button';
import { CircularProgress, Box } from '@material-ui/core';

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { verificar, match } = this.props;
    verificar(match.params.token);
  }

  render() {
    const { loading, verified, mensaje, history } = this.props;

    return (
      <div className="container page mt-4">
        {loading && (
          <Box>
            <h1>Verifying account</h1>
            <CircularProgress size={24} color="primary" />
          </Box>
        )}
        {!loading && verified ? (
          <Section>
            <h1>We are ready to go!</h1>
            <p>Your account was activated successfully now you can login.</p>
            <Button color="primary" onClick={() => history.replace('/login')}>
              Go to login
            </Button>
          </Section>
        ) : (
          <Section>
            <h2>Something happened with your account activation!</h2>
            <p>{mensaje}</p>
          </Section>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ registroState }, props) => {
  const { loading, verified, mensaje } = registroState;
  return { loading, verified, mensaje };
};

const mapDispatchToProps = dispatch => {
  return {
    verificar: token => dispatch({ type: 'VERIFICAR', token }),
  };
};

ConfirmationPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPage);
