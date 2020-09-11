import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Right from '@material-ui/icons/ChevronRight';

import { MEDIA_SCREENS, CSS_HELPERS_REACT } from '../../theme';
import { IconButton } from '@material-ui/core';

const PlanShortInfoItem = ({ idPlan, plan, urlFoto, descripcion, onClick }) => {
  let cursorStyle;
  if (onClick) {
    cursorStyle = { cursor: 'pointer' };
  }

  return (
    <div className="w-100">
      {/* <hr className="w-100"></hr> */}
      <div
        className="row"
        style={cursorStyle}
        onClick={() => onClick && onClick(idPlan)}
      >
        <div className="col">
          <Image src={urlFoto} draggable="false" />
        </div>
        <div className="col">
          <h6 style={CSS_HELPERS_REACT.TRUNCATE}> {plan}</h6>
          <p className="mb-1">{descripcion}</p>
        </div>
        {onClick && (
          <div className="col-2">
            <IconButton
              aria-label="go"
              style={{ borderRadius: 'unset', backgroundColor: 'unset' }}
              className="h-100"
              size="medium"
            >
              <Right fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>
      <hr className="w-100"></hr>
    </div>
  );
};

PlanShortInfoItem.propTypes = {
  idPlan: PropTypes.number,
  plan: PropTypes.string,
  urlFoto: PropTypes.string,
  descripcion: PropTypes.string,
  onClick: PropTypes.func,
};

export default PlanShortInfoItem;

const Image = styled.img`
  border-radius: 0.3em;

  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.MEDIUM.TO + 'px'}) {
    src: url(${props => props.src});
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  @media only screen and (min-width: ${MEDIA_SCREENS.SMALL.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.SMALL.TO + 'px'}) {
    src: url(${props => props.src});
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
