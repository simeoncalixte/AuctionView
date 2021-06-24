import styled, { keyframes } from "styled-components";
import React from "react";

const AnimatedCross = styled.div<{
  width: string;
}>`
  width: ${(props) => props.width};
  svg circle,
  svg path {
    stroke: #35cc35;
  }
  svg path {
    transition: all 1s ease;
    stroke-dasharray: 677px;
    stroke-dashoffset: 677px;
  }
  svg circle {
    transition: all 1s ease;
    stroke-dasharray: 1045px;
    stroke-dashoffset: 1045px;
  }
  &[data-init-animation="true"] {
    svg path {
      stroke-dashoffset: 0px;
    }
    svg circle {
      stroke-dashoffset: 0px;
    }
  }
`;
interface IAnimatableCross {
  isActive: boolean;
  width: string;
}

const AnimatableCross = (props: IAnimatableCross) => {
  return (
    <AnimatedCross data-init-animation={props.isActive} width={props.width}>
      <svg viewBox="0 0 343 343" xmlns="http://www.w3.org/2000/svg">
        <circle cx="171.5" cy="171.5" r="166.5" stroke="black" />
        <path d="M53.5 47.5L290 296M56 296L295 57" />
      </svg>
    </AnimatedCross>
  );
};

export default AnimatableCross;
