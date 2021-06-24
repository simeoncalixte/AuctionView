import styled, { keyframes } from "styled-components";
import React from "react";

const AnimatedCheckMark = styled.div<{
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

const AnimatableCheckMark = (props: IAnimatableCross) => {
  return (
    <AnimatedCheckMark data-init-animation={props.isActive} width={props.width}>
      <svg viewBox="0 0 460 369" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="171.5"
          cy="197.5"
          r="166.5"
          stroke="black"
          stroke-width="10"
        />
        <path
          d="M15 193C43 216 56.8968 237.88 74 264C90.2889 288.877 99.6918 303.52 118.083 342.549C118.444 343.317 119.551 343.323 119.913 342.557C169.789 236.884 242.69 168.292 242.999 168.001C243.009 167.992 242.991 168.009 243.001 167.999C243.301 167.694 331.211 78.3813 454.5 9"
          stroke="black"
          stroke-width="20"
        />
      </svg>
    </AnimatedCheckMark>
  );
};

export default AnimatableCheckMark;
