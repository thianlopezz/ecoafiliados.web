import React from 'react';
import Carousel from './carousel/Carousel';
import useWindowDimensions from '../../theme/Dimensions';
import Section from './wrappers/Section';
export default function SectionCard({
  Card,
  data,
  title,
  actions,
  carousel,
  aspect,
}) {
  const { width } = useWindowDimensions();
  return (
    <Section>
      <h2>{title}</h2>
      <Carousel width={width} grid={!carousel} aspect={aspect}>
        {data &&
          data.map((item, index) => (
            <Card key={index} {...item} {...actions} />
          ))}
      </Carousel>
    </Section>
  );
}
