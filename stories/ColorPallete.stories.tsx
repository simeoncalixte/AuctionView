import React from "react";
import ColorPallete from "../utils/ColorPallet/index";
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const Container = styled.div<{ color: string }>`
  position: relative;
  background: ${(props) => props.color};
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  color: white;
  mix-blend-mode: difference;
  align-items: center;
`;

const ColorPalleteDisplay = (props) => {
  const color = Object.keys(ColorPallete).map((color) => {
    return (
      <Container color={ColorPallete[color]}>
        <span>{color}</span>
        <span>{ColorPallete[color]}</span>
      </Container>
    );
  });

  return <>{color}</>;
};

export default {
  title: "ColorPallete",
  component: ColorPalleteDisplay,
} as Meta;

export const Colors = (args) => <ColorPalleteDisplay />;
