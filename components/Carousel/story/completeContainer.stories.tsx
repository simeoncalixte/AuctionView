import React from "react";
import styled from "styled-components";
import CarouselContainer from "../CarouselContainer";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Carousel/Container",
  component: CarouselContainer,
} as Meta;

const Item = styled.div`
  width: 100%;
`;

export const Container = (args) => {
  return (
    <CarouselContainer {...args}>
      <Item>item 1</Item>
      <Item>item 2</Item>
      <Item>item 3</Item>
      <Item>item 4</Item>
      <Item>item 5</Item>
      <Item>item 6</Item>
      <Item>item 7</Item>
      <Item>item 8</Item>
      <Item>item 9</Item>
      <Item>item 10</Item>
    </CarouselContainer>
  );
};

Container.args = {
  frameBasis: 50,
};
