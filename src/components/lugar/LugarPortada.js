import React from 'react';
import styled from 'styled-components';
import { PLACEDEF } from '../../constants';
import { portadaScale } from '../../theme/Keyframes';
import { ButtonBase } from '@material-ui/core';
import { palette } from '../../theme';

export default function LugarPortada(props) {
  const foto = props.foto ? `/assets/img/lugares/${props.foto}` : PLACEDEF;
  return (
    <ButtonBase style={{ width: '100%' }}>
      <PortadaContainer>
        <TextoPortada>
          {' '}
          <h1>{props.lugar}</h1>
        </TextoPortada>
        <FotoPortada src={foto}></FotoPortada>
      </PortadaContainer>
    </ButtonBase>
  );
}

const PortadaContainer = styled.div`
  width: 100%;
  height: 30vh;
  overflow: hidden;
  float: left;
  cursor: pointer;
  top: 10em;
`;
const FotoPortada = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  &:hover {
    animation: ${portadaScale} 3s infinite alternate;
  }
`;
const TextoPortada = styled.div`
  padding: 2em;
  z-index: 20;
  bottom: 0;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  padding-bottom: 0.4em;
  padding-top: 0.6em;
  background-color: rgba(0, 0, 0, 0.3);
  h1 {
    color: ${palette.secondary.contrastText};
  }
`;
