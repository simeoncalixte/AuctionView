import React from "react";
import Signup from "../SignUp";
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
export default {
  title: "Authentication/Registration",
  component: Signup,
} as Meta;

export const RegistrationPage = (args) => (
  <Container>
    <Signup {...args} />
  </Container>
);
