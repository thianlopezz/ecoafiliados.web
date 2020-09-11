import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

import { email, phone } from '../../helpers/validations';
import { Avatar, FormHelperText } from '@material-ui/core';
import File from '../common/inputs/File';

class BrandInfoForm extends Component {
  state = { file: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.onImageChange = this.onImageChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { file } = this.state;
    let errors = {};
    let valid = true;

    if (!file || !file.name) {
      valid = false;
      errors = {
        ...errors,
        file: 'Select a file',
      };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(file);
  }

  onChange(e) {
    let { planner, onPlannerChange } = this.props;

    planner[e.target.name] = e.target.value;
    onPlannerChange(planner);
  }

  onImageChange(e) {
    let { planner, onPlannerChange, onFileTooBig } = this.props;

    let file = e.target.files[0];

    if (!file) return;

    if (file.size / 1024 / 1024 > 3) {
      return onFileTooBig();
    }

    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = e => {
      onPlannerChange({ ...planner, urlLogo: fr.result });
    };

    this.setState({ file });
  }

  triggerFileInput() {
    // FIXME: no creo que este bien hacer esto
    document.getElementById('file').click();
  }

  render() {
    const { errors, file } = this.state;
    const { loading, planner } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <div className="row form-group my-3">
          <div className="col-md-12">
            <h2 className="text-center my-2 mb-4">{planner.agencia}</h2>
            {planner.urlLogo ? (
              <Avatar
                src={planner.urlLogo}
                style={{ width: '240px', height: '240px' }}
                className="mx-auto"
              />
            ) : (
              planner.agencia && (
                <Avatar
                  style={{ width: '240px', height: '240px' }}
                  className="mx-auto"
                >
                  <h1>{planner.agencia[0]}</h1>
                </Avatar>
              )
            )}
            <File
              hidden
              name="file"
              value={file && file.name}
              onChange={this.onImageChange}
              accept="image/*"
            />
            <p className="my-1 text-center">
              <a
                href="javascript:;"
                onClick={this.triggerFileInput}
                text={(file && file.name) || 'Subir archivo'}
              >
                {(file && file.name) || 'Elige una imagen'}
              </a>
            </p>
            {errors && <FormHelperText error>{errors.file}</FormHelperText>}
          </div>
        </div>
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

BrandInfoForm.propTypes = {
  planner: PropTypes.object,
  onPlannerChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default BrandInfoForm;
