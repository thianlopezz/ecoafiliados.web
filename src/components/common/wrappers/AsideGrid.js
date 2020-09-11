import React from 'react';
import { flexbox } from '@material-ui/system';
import styled from 'styled-components';
import { MEDIA_SCREENS, palette } from '../../../theme';

export default function AsideGrid(props) {
  const maxWidthLeft =
    (props.web.left * 100) / (props.web.left + props.web.right);
  const maxWidthRigth =
    (props.web.right * 100) / (props.web.left + props.web.right);

  const web = {
    left: maxWidthLeft,
    right: maxWidthRigth,
  };
  const mob = {
    flexDirection: props.mob.d,
  };

  return (
    <_Container web={web} mob={mob}>
      <_MainSide web={web} mob={mob}>
        {props.children[0]}
      </_MainSide>
      <_SecondarySide web={web} mob={mob}>
        {props.children[1]}
      </_SecondarySide>
    </_Container>
  );
}

const _Container = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.web.direction ? props.web.direction : 'row'};
  @media only screen and (max-width: ${MEDIA_SCREENS.SMALL
      .TO}px) and (min-width: ${MEDIA_SCREENS.SMALL.FROM}px) {
    flex-direction: ${props =>
      props.mob.flexDirection ? props.mob.flexDirection : 'row'};
  }
`;
const _MainSide = styled.div`
  @media only screen and (max-width: ${MEDIA_SCREENS.MEDIUM
      .TO}px) and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM}px) {
    max-width: ${props => props.web.left}%;
    flex: ${props => props.web.left};
  }

  @media only screen and (max-width: ${MEDIA_SCREENS.SMALL
      .TO}px) and (min-width: ${MEDIA_SCREENS.SMALL.FROM}px) {
    padding: 0;
    flex: 1;
  }
`;

const _SecondarySide = styled.div`
  padding: 0 0.9em 0 0.9em;
  @media only screen and (max-width: ${MEDIA_SCREENS.MEDIUM
      .TO}px) and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM}px) {
    max-width: ${props => props.web.right}%;
    flex: ${props => props.web.right};
  }
  @media only screen and (max-width: ${MEDIA_SCREENS.SMALL
      .FROM}px) and (min-width: ${MEDIA_SCREENS.SMALL.FROM}px) {
    flex: 1;
  }
`;
