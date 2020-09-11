import React, { Fragment } from 'react';
import styled from 'styled-components';
import { MEDIA_SCREENS, CSS_HELPERS_REACT } from '../../../theme';
import { ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
const ImageCard = ({
  id,
  title,
  subtitle,
  description,
  image,
  imgClass,
  onClick,
  link,
}) => {
  let style = {};
  return (
    // marginBottom: '3em' Saque esto no creo que este margin vaya en la carta sino en un componente que contenga las cartas
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column' }}>
      <ButtonBase style={{ outline: 'none', borderRadius: '.2em' }}>
        <Link to={link}>
          <Image
            src={image}
            draggable="false"
            style={{ borderRadius: '.6em', ...CSS_HELPERS_REACT.BOX_SHADOW }}
          />
        </Link>
      </ButtonBase>

      <div className="card-body px-0 pt-3 pb-0">
        {subtitle && <p className="mb-1 text-muted">{subtitle}</p>}{' '}
        {title && <h5 style={CSS_HELPERS_REACT.TRUNCATE}>{title}</h5>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

const Image = styled.img`
  /* border-radius: 0.3em; */

  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.MEDIUM.TO + 'px'}) {
    src: url(${props => props.src});
    height: 30vh;
    object-fit: cover;
    width: 100%;
  }

  @media only screen and (min-width: ${MEDIA_SCREENS.SMALL.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.SMALL.TO + 'px'}) {
    src: url(${props => props.src});
    height: 20vh;
    object-fit: cover;
    width: 100%;
  }
`;

export default ImageCard;
