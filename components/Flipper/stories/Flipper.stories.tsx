import React from "react";
import Flipper from "../index";
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
export default {
  title: "Flipper/index",
  component: Flipper,
} as Meta;

export const CompleteFlipper = (args) => (
  <Container>
    <Flipper {...args} />
  </Container>
);
