import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';

class RegistroSuccessPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { registro } = this.props;

    return (
      <div className="container page mt-4">
        <Section>
          <h2>Congratulations</h2>
          <h1>{registro.nombre}</h1>
          <p>
            We've send an email to your account{' '}
            <strong>{registro.correo}</strong> with all the instructions to
            activate your account.
          </p>
          <p className="text-muted">
            Don't forget to check your spam folder too.
          </p>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = ({ registroState }, props) => {
  const { registro } = registroState;
  return { registro };
};

RegistroSuccessPage.propTypes = {};

export default connect(
  mapStateToProps,
  null
)(RegistroSuccessPage);
