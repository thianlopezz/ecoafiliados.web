import React from 'react';
import Container from '../../../components/common/wrappers/Container';
import Section from '../../../components/common/wrappers/Section';
import { fnUiStrings } from '../../../theme/uiStrings';
import JSONTree from 'react-json-tree';

import styled from 'styled-components';
import {
  MEDIA_SCREENS,
  palette,
  status,
  CSS_HELPERS_REACT,
  CSS_HELPERS,
} from '../../../theme';
import { ReactComponent as TurtleSuccess } from '../../../theme/images/icons/TurtleSuccess.svg';
import { ReactComponent as TurtleWarning } from '../../../theme/images/icons/TurtleWarning.svg';
import { ReactComponent as TurtleDanger } from '../../../theme/images/icons/TurtleDanger.svg';

String.prototype.hash = function() {
  const capitalize = this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
  const removeSpaces = capitalize.replace(/\s/g, '');
  const hash = '#' + removeSpaces;
  return hash;
};

const InfoPage = () => {
  const copys = fnUiStrings('es');

  const {
    gps_restrictions: {
      title,
      description,
      allowedProducts,
      prohibitedProducts,
      restrictedProducts,
    },
  } = copys;

  return (
    <Container title={title} description={description}>
      <GridContainer>
        <GridElement>
          <Section>
            <List>
              <Card>
                <CardDescription>
                  <Hash success>{allowedProducts.title.hash()}</Hash>
                  <p>{allowedProducts.description}</p>
                </CardDescription>
                <TurtleSuccess />
              </Card>
              {allowedProducts.list &&
                allowedProducts.list.map(item => (
                  <ListItem>
                    <Code>{item.code}</Code>
                    <Description>{item.description}</Description>
                    <Restrictions>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton primary>
                        <span className="fas fa-info" />
                      </BubbleButton>
                    </Restrictions>
                  </ListItem>
                ))}
            </List>
          </Section>
        </GridElement>

        <GridElement>
          <Section>
            <List>
              <Card>
                <CardDescription>
                  <Hash warning>{restrictedProducts.title.hash()}</Hash>
                  <p>{restrictedProducts.description}</p>
                </CardDescription>
                <TurtleWarning />
              </Card>
              {restrictedProducts.list &&
                restrictedProducts.list.map(item => (
                  <ListItem>
                    <Code>{item.code}</Code>
                    <Description>{item.description}</Description>
                    <Restrictions>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton primary>
                        <span className="fas fa-info" />
                      </BubbleButton>
                    </Restrictions>
                  </ListItem>
                ))}
            </List>
          </Section>
        </GridElement>

        <GridElement>
          <Section>
            <List>
              <Card>
                <CardDescription>
                  <Hash danger>{prohibitedProducts.title.hash()}</Hash>
                  <p>{prohibitedProducts.description}</p>
                </CardDescription>
                <TurtleDanger />
              </Card>
              {prohibitedProducts.list &&
                prohibitedProducts.list.map(item => (
                  <ListItem>
                    <Code>{item.code}</Code>
                    <Description>{item.description}</Description>
                    <Restrictions>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton>
                        <span>10</span>
                      </BubbleButton>
                      <BubbleButton primary>
                        <span className="fas fa-info" />
                      </BubbleButton>
                    </Restrictions>
                  </ListItem>
                ))}
            </List>
          </Section>
        </GridElement>
      </GridContainer>
    </Container>
  );
};
export default InfoPage;

/// HEADING

export const Card = styled.div`
        ${CSS_HELPERS.CENTER}
        background-color: ${palette.secondary.contrastText};
        border-radius:.9em;
        margin:.9em;
        ${CSS_HELPERS.BOX_SHADOW}
        display:flex;
        flex-direction: row;
        align-items:center;
        min-height:9vh;
        padding:.9em;

        svg{
            flex:3;
            padding:.9em;
        }
        div{
            flex:3;
        }

        
   `;

export const CardDescription = styled.div`
  p {
    padding: 0.9em 0 0.9em 0;
  }
`;
export const Hash = styled.h4`
  color: ${props =>
    props.danger
      ? status.danger
      : props.warning
      ? status.warning
      : props.success && status.success};
`;

/// CONTAINER

export const GridContainer = styled.div`
  display: flex;
  @media only screen and (min-width: ${MEDIA_SCREENS.SMALL
      .FROM}px) and (max-width: ${MEDIA_SCREENS.SMALL.TO}px) {
    flex-direction: column;
  }
  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM}px) {
    flex-direction: row;
  }
`;
export const GridElement = styled.div`
  flex: 1;
  margin: 0.9em;
`;

/// LIST AND ITEMS

export const List = styled.div`
  background-color: ${palette.gray.gray100};
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.div`
  background-color: ${palette.secondary.contrastText};
  border-radius: 0.9em;
  margin: 0.9em;
  ${CSS_HELPERS.BOX_SHADOW}
  display:flex;
  flex-direction: row;
  align-items: center;
  min-height: 9vh;
  padding: 0.9em;
`;
export const Code = styled.p`
  flex: 3;
`;

export const Description = styled.p`
  flex: 9;
`;

export const Restrictions = styled.p`
  flex: 6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BubbleButton = styled.button`
  opacity: 0.8;
  background-color: ${props =>
    props.primary ? palette.primary.main : palette.gray.gray100};
  background-repeat: no-repeat;
  color: ${props =>
    props.primary
      ? palette.secondary.contrastText
      : palette.primary.contrastText};
  z-index: 1;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  outline: 'none';
  font-size: 0.6em;
  border: none;
  transition: all 0.3s ease-in-out;
  ${CSS_HELPERS.CENTER};
  /* margin:2em; */

  &:focus {
    outline: 0 !important;
  }
  &:hover {
    transform: scale(1.5);
    cursor: pointer;
  }

  span {
    margin: auto;
    font-size: 1.8em;
  }
`;
