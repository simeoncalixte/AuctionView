import React, { FunctionComponent } from "react";
import styled from "styled-components";
import colors from "../../../../utils/ColorPallet";

export enum EButtonSize {
  "XS",
  "S",
  "M",
  "L",
  "XL",
}
type TButtonSize = keyof typeof EButtonSize;
type TColors = keyof typeof colors;

export interface IDefaultButtonProps {
  backgroundColor?: TColors;
  textColor?: TColors;
  borderColor?: TColors;
  size?: TButtonSize;
  justifyContent?: string;
  display?: string;
  width?: string;
}

const buttonSizeStyle = (size: string) => {
  switch (EButtonSize[size]) {
    case EButtonSize.XL:
      return `
                font-weight: bolder;
                font-size: 20px;
                padding: 3px 25px;
                letter-spacing: 1px;
            `;
    case EButtonSize.L:
      return `
                font-weight: bolder;
                font-size: 16px;
                padding: 3px 20px;
            `;
    case EButtonSize.S:
      return `
                font-size: 12px;
                padding: 3px 12px;
            `;
    case EButtonSize.XS:
      return `
                font-size: 10px;
                padding: 3px 10px;
            `;
    case EButtonSize.M:
    default:
      return `
        img {
          width: 80px;
          height: 25px;
		}

        font-size: 14px;
        padding: 3px 15px;
        box-shadow: 1px 1px 2px #80808040;
      `;
  }
};

export const DefaultButton = styled.button<
  Omit<IDefaultButtonProps, "children">
>`
  background: ${(props) =>
    props.backgroundColor ? colors[props.backgroundColor] : colors.white};
  color: ${(props) =>
    props.textColor ? colors[props.textColor] : colors.white};
  border-color: ${(props) =>
    props.borderColor ? colors[props.borderColor] : colors.white};
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  width: ${(props) => (props.width ? props.width : "50%")};
  border-radius: 2px;
  border-style: solid;
  box-shadow: 1px 1px 1px #80808040;
  border-width: 1px;
  margin: 5px 0px 0px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.1s;
  min-width: 200px;
  :hover {
    scale: 0.98;
  }
  :active {
    scale: 0.94;
    box-shadow: 0px 0px 3px black;
    border-style: ridge;
    border-style: solid;
    border-color: #262020f2;
    border-width: 1px;
  }
  & * {
    pointer-events: none;
  }
  ${(props) => buttonSizeStyle(props.size)}
`;

export default DefaultButton;
