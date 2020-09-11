import React from 'react';
import styled from 'styled-components';
import { MEDIA_SCREENS } from '../../../theme';

const Container = props => {
  return (
    <Component>
      {
        <JumboTron>
          {props.title && <h1>{props.title}</h1>}
          {props.description && <p>{props.description}</p>}
        </JumboTron>
      }
      <Childs>{props.children}</Childs>
    </Component>
  );
};

export default Container;

const JumboTron = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
`;

const Component = styled.div`
  padding-bottom: 10em;
  padding-left: 6em;
  padding-right: 6em;

  flex-direction: row;
  @media only screen and (min-width: ${MEDIA_SCREENS.SMALL
      .FROM}px) and (max-width: ${MEDIA_SCREENS.SMALL.TO}px) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`;

const Childs = styled.div`
  > * {
    margin-top: 3em;
  }
`;
