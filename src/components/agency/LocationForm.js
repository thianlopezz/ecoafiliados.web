import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

import { email, phone } from '../../helpers/validations';
import MapContainer from '../common/MapContainer';
import Select from '../common/inputs/Select';
import { FormHelperText } from '@material-ui/core';

class LocationForm extends Component {
  state = {
    center: { lat: -0.3830876, lng: -90.983792 },
    zoom: 18,
    errors: {},
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeCenter = this.onChangeCenter.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { planner } = this.props;

    if (!planner.latitud || !planner.longitud) {
      this.getLocation();
    } else {
      this.setState({ zoom: 18 });
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.onChangeCenter({
          lat: () => position.coords.latitude,
          lng: () => position.coords.longitude,
        })
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { planner } = this.props;
    let errors = {};
    let valid = true;

    if (!planner.idCiudad) {
      valid = false;
      errors = { ...errors, idCiudad: 'Select your city location' };
    }

    if (!planner.direccion || planner.direccion.trim() === '') {
      valid = false;
      errors = { ...errors, direccion: 'Your bussiness address is required' };
    }

    if (!planner.latitud || !planner.longitud) {
      valid = false;
      errors = {
        ...errors,
        center: 'Select the exact location of your bussiness',
      };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(planner);
  }

  onChange(e) {
    let { planner, onPlannerChange } = this.props;

    planner[e.target.name] = e.target.value;
    onPlannerChange(planner);
  }

  onChangeCenter(coords) {
    let { planner, onPlannerChange } = this.props;
    const center = { lat: coords.lat(), lng: coords.lng() };
    onPlannerChange({ ...planner, latitud: center.lat, longitud: center.lng });
    this.setState({ center });
  }

  render() {
    const { errors, zoom } = this.state;
    const { loading, planner, ciudadesOption } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Select
          className="mt-2"
          label="Location"
          name="idCiudad"
          className=""
          value={planner.idCiudad}
          options={ciudadesOption}
          onChange={this.onChange}
          error={errors.idCiudad}
        />
        <Input
          label="Address"
          name="direccion"
          multiline={true}
          rows={3}
          placeholder={'Write down the address of your agency'}
          value={planner.direccion}
          onChange={this.onChange}
          error={errors.direccion}
        />
        <div className="row" style={{ height: '25rem' }}>
          <div className="col-12">
            <label>Set in the map the right location of your agency</label>
            <MapContainer
              onCenterChange={this.onChangeCenter}
              zoom={zoom}
              center={{ lat: planner.latitud, lng: planner.longitud }}
            />
          </div>
        </div>
        <br />
        {errors.center && (
          <FormHelperText error>{errors.center}</FormHelperText>
        )}
        <br />
        <Button
          type="submit"
          text="Save"
          variant="contained"
          className="mr-2"
          color="primary"
          loading={loading}
        />
      </form>
    );
  }
}

LocationForm.propTypes = {
  planner: PropTypes.object,
  onPlannerChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LocationForm;
