import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import BasicInfoForm from './BasicInfoForm';
import LocationForm from './LocationForm';
import BrandInfoForm from './BrandInfoForm';

class AgencyForm extends Component {
  componentDidMount() {}

  render() {
    const {
      loading,
      planner,
      step,
      onPlannerChange,
      ciudadesOption,
      onSubmitBasicInfo,
      onSubmitLocationInfo,
      onSubmitBrandInfo,
    } = this.props;

    return (
      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>Información básica</StepLabel>
          <StepContent>
            <BasicInfoForm
              loading={loading}
              onSubmit={onSubmitBasicInfo}
              planner={planner}
              onPlannerChange={onPlannerChange}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>City & address info</StepLabel>
          <StepContent>
            <LocationForm
              onSubmit={onSubmitLocationInfo}
              ciudadesOption={ciudadesOption}
              loading={loading}
              planner={planner}
              onPlannerChange={onPlannerChange}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Brand</StepLabel>
          <StepContent>
            <BrandInfoForm
              onSubmit={onSubmitBrandInfo}
              loading={loading}
              planner={planner}
              onPlannerChange={onPlannerChange}
            />
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

AgencyForm.propTypes = {
  usuario: PropTypes.object,
  onPlannerChange: PropTypes.func,
  onSubmitBasicInfo: PropTypes.func,
  onCancel: PropTypes.func,
  step: PropTypes.number,
  ciudadesOption: PropTypes.array,
};

export default AgencyForm;
