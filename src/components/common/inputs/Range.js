import React from 'react';
import { withStyles, Slider, InputLabel } from '@material-ui/core';

const CusomizedSlider = withStyles({
  root: {
    // color: '#52af77',
    // height: 8,
  },
  thumb: {
    // height: 24,
    // width: 24,
    // backgroundColor: '#fff',
    // border: '2px solid currentColor',
    marginTop: '-1.75px',
    // marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const Range = ({
  label,
  className,
  value,
  step = 10,
  marks,
  valueLabelDisplay,
  getAriaValueText,
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <InputLabel htmlFor="age-simple">{label}</InputLabel>}
      <CusomizedSlider
        // disabled
        defaultValue={value}
        getAriaValueText={getAriaValueText}
        aria-labelledby="discrete-slider-always"
        step={step}
        marks={marks}
        valueLabelDisplay={valueLabelDisplay}
      />
    </div>
  );
};

export default Range;
