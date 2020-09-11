import styled from 'styled-components';
import { palette } from '../../../theme';
export const NEXT = 'NEXT';
export const PREV = 'PREV';

export const Toolbar = styled.div`
  /* z-index: 20; */
  width: 101%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 15vh;
`;

export const CarouselList = styled.div`
  /* padding: 1.5em; */
  display: flex;
  transition: ${props => (props.sliding ? 'none' : 'transform .24s ease')};
  transform: ${props => {
    if (!props.sliding) {
      return `translateX(calc(-${100 / props.aspect}% ))`;
    }
    if (props.dir === PREV)
      return `translateX(calc(2 * (-${90 / props.aspect}% - 1.5em)))`;
  }};
`;

export const CarouselSlot = styled.article`
  order: ${props => props.order};
  padding: 0.9em;
  flex: 1 0 100%;
  flex-basis: ${props => `${100 / props.aspect}%`};
`;

export const SlideButton = styled.button`
  opacity: 0.8;
  margin: 2em;
  background-color: ${palette.primary.main};

  background-repeat: no-repeat;
  color: ${palette.secondary.contrastText};
  z-index: 1;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  outline: 'none';
  font-size: 0.6em;
  border: none;
  transition: all 0.3s ease-in-out;

  display: inline-flex;
  align-items: center;

  &:focus {
    outline: 0 !important;
  }
  &:hover {
    transform: scale(1.5);
    cursor: pointer;
  }
  i {
    margin: auto;
    font-size: 1.8em;
  }
`;

export const GridContainer = styled.div`
  column-count: 3;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
  position: relative;
  user-select: none;
  background-color: ${palette.gray.gray100};
`;
export const GridElement = styled.div`
  /* flex-basis: ${props => `${100 / props.aspect}%`};
  padding-right: 0.9em;
  padding-left: 0.9em; */
    break-inside: avoid-column;
    padding-left: 1rem;
    padding-right: 1rem;
`;

/// HISGTORIE ELEMENTS

export const StorieSlot = styled.article`
  order: ${props => props.order};
  padding-right: 0.3em;
  padding-left: 0.3em;
  flex-basis: ${props => `${100 / props.aspect}%`};
`;
export const StorieGridElement = styled.article`
  -ms-flex: auto;
  position: relative;
  box-sizing: border-box;
  padding: 0.9em 0.3em;
`;
