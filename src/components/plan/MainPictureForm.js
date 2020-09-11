import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormHelperText } from '@material-ui/core';
import File from '../common/inputs/File';
import Button from '../common/inputs/Button';
import PlanCard from './PlanCard';
import Section from '../common/wrappers/Section';

class MainPictureForm extends Component {
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
    let { plan, onPlanChange } = this.props;

    plan[e.target.name] = e.target.value;
    onPlanChange(plan);
  }

  onImageChange(e) {
    let { plan, onPlanChange, onFileTooBig } = this.props;

    let file = e.target.files[0];

    if (!file) return;

    if (file.size / 1024 / 1024 > 3) {
      return onFileTooBig();
    }

    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = e => {
      onPlanChange({ ...plan, urlFoto: fr.result });
    };

    this.setState({ file });
  }

  triggerFileInput() {
    // FIXME: no creo que este bien hacer esto
    document.getElementById('file').click();
  }

  render() {
    const { errors, file } = this.state;
    const { loading, plan } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section
          title="Agrega una foto de portada para tu plan"
          description="Elige una foto que represente tu plan. Esta es la foto principal, la
            que aparecerá cuando tus pasajeros busquen tu oferta."
          style={{ marginBottom: '4rem' }}
        >
          <div className="row form-group my-3">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-5 col-sm-12 my-auto">
                  <p className="text-center">
                    <a
                      href="javascript:;"
                      onClick={this.triggerFileInput}
                      text={(file && file.name) || 'Subir archivo'}
                    >
                      {(file && file.name) || 'Elige una imagen'}
                    </a>
                  </p>
                </div>
                <div className="col-md-7 col-sm-12">
                  <p className="text-muted text-center">Preview</p>
                  <PlanCard {...plan} />
                </div>
              </div>
              <File
                hidden
                name="file"
                value={file && file.name}
                onChange={this.onImageChange}
                accept="image/*"
              />
            </div>
            {errors && (
              <div className="col-12">
                <FormHelperText error>{errors.file}</FormHelperText>
              </div>
            )}
          </div>
        </Section>
        <Button
          type="submit"
          text="Guardar"
          variant="contained"
          className="mr-2"
          color="primary"
          loading={loading}
        />
      </form>
    );
  }
}

MainPictureForm.propTypes = {
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default MainPictureForm;
