import React from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  CarouselWrapper,
  CarouselList,
  CarouselSlot,
  SlideButton,
  PREV,
  NEXT,
  Toolbar,
  GridContainer,
  GridElement,
} from './CarouselComponents';
import { MEDIA_SCREENS } from '../../../theme';

const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
const initialState = { pos: 0, sliding: false, dir: NEXT };

const Carousel = ({ children, width, grid }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const numItems = React.Children.count(children);
  const slide = dir => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: 'stopSliding' });
    }, 3);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const aspect = MEDIA_SCREENS.SMALL.TO > width ? 3 : 4;

  return !grid ? (
    <CarouselWrapper {...handlers}>
      <Toolbar>
        <SlideButton onClick={() => slide(PREV)} left={true}>
          <i className="fas fa-chevron-left" />
        </SlideButton>
        <SlideButton onClick={() => slide(NEXT)} right={true}>
          <i className="fas fa-chevron-right" />
        </SlideButton>
      </Toolbar>

      <div>
        <CarouselList aspect={aspect} dir={state.dir} sliding={state.sliding}>
          {React.Children.map(children, (child, index) => (
            <CarouselSlot
              aspect={aspect}
              key={index}
              order={getOrder({ index: index, pos: state.pos, numItems })}
            >
              {child}
            </CarouselSlot>
          ))}
        </CarouselList>
      </div>
    </CarouselWrapper>
  ) : (
    <GridContainer>
      {React.Children.map(children, (child, index) => (
        <GridElement aspect={aspect}>{child}</GridElement>
      ))}
    </GridContainer>
  );
};

function reducer(state, { type, numItems }) {
  switch (type) {
    case 'reset':
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1,
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1,
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Carousel;
